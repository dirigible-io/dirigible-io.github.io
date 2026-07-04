---
title: "When the Model Isn't Enough: Custom Java in the Web IDE"
description: "Low-code where you can, real code where you must. How to drop a hand-written Java calculation into a generated Dirigible application using calculated-field actions and the IntelliJ-grade Java tooling in the web IDE - without leaving the browser."
author: Iliyan Velichkov
author_gh_user: iliyan-velichkov
author_avatar: https://avatars.githubusercontent.com/u/5058839?v=4
read_time: 5 min
publish_date: July 3, 2026
---

Model-driven platforms live or die by their **escape hatch**. Ninety percent of an application is CRUD, forms, dropdowns and workflows that you should never hand-write - and the [Eclipse Dirigible](https://www.dirigible.io/) intent layer generates exactly that. But every real system has the other ten percent: a calculation, an integration, a rule that no model can express. The question is whether the platform lets you write it cleanly, or forces you to fight it.

In this article we take the generated `sales-invoices` module from the [multi-module sample](https://github.com/dirigiblelabs/sample-intent-multi-model) - the same one built in the [first post in this series](../01/intent-driven-sales-invoices.md) - and replace one piece of logic - the invoice **number generation** - with hand-written Java, using the full IDE tooling, without leaving the browser.

## The boundary: model vs. code

The intent owns three folders, each with a clear owner:

| Folder | Owned by | Lifecycle |
| --- | --- | --- |
| the `*.intent` | you | the only authored model artefact |
| `gen/` | the platform | wiped and regenerated on every Generate |
| `custom/` | you | the escape hatch - touched by nobody |

Anything you hand-write goes in `custom/`. It survives regeneration. The model declares a hook; your code supplies the implementation.

## The hook: a calculated-field action

Line totals (`Net = Quantity * Price`) are neutral arithmetic - a one-line calculated expression in the intent, evaluated on the server and previewed live. But the invoice **number** is different: in a real deployment it comes from a number-series service with prefixes and sequences. That is logic, not arithmetic.

The intent declares the field as a **calculated action** and imports the class that will implement it:

```yaml
- name: SalesInvoice
  imports: |
    import custom.sales_invoices.SalesInvoiceNumberAction;
  fields:
    - { name: number, type: string, length: 100, calculatedActionOnCreate: SalesInvoiceNumberAction }
```

`calculatedActionOnCreate` names a Java class; the generated repository will call `Beans.get(SalesInvoiceNumberAction.class).calculate(entity)` whenever an invoice is created. The model says *what* runs; you write *how*.

## The implementation

Under `custom/`, write the class:

```java
package custom.sales_invoices;

import java.util.UUID;

import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.db.CalculatedField;

@Component
public class SalesInvoiceNumberAction implements CalculatedField<Object, String> {

    @Override
    public String calculate(Object entity) {
        return UUID.randomUUID().toString();
    }
}
```

`@Component` makes it a managed bean; `CalculatedField<E, T>` is the one-method contract the repository invokes. Here it returns a UUID so the sample runs without an external service - swap in a real number-series call and nothing in the model changes.

## The tooling: IntelliJ-grade Java in the browser

This is where the Dirigible web IDE earns its keep. Editing that class, you get full **JDT language-server** support directly in the browser:

- completion, hover and signature help over the platform SDK
- **go to definition** and **peek references** across your code and the SDK
- rename and other refactorings
- live diagnostics as you type
- breakpoints and step-debugging through the Java debugger

Client Java is compiled **in-process** - one `javac` task per synchronization cycle, sharing the JVM with the platform - so `Beans.get(...)` resolves real platform beans and your class is live at the next request.

> 📸 *Screenshot: the web IDE editing the Java action - completion popup over the SDK, Problems view clean.*

## A reusable escape hatch: a workflow delegate

A calculated field is one hook; a **BPM `delegate` service task** is another. In the finished sample the invoice's *definitive* number (`SI00000001`) is stamped after the Issue step, not on create. The process declares a delegate step:

```yaml
- name: generateNumber
  kind: serviceTask
  args:
    delegate: custom.sales_invoices.DocumentNumberGeneratorDelegate
    fields: { type: "Sales Invoice" }
    next: allocatePayments
```

`delegate` binds the step to a hand-written `JavaDelegate` in `custom/`. That delegate loads and saves the invoice through its **generated repository** (keeping validations, events and i18n) and defers the actual prefix + zero-padded formatting to a *separate, entity-agnostic* generator that lives in its own module, the `numbers` module (of the same repo):

```java
// custom/sales_invoices/DocumentNumberGeneratorDelegate.java  (in the invoices module)
public class DocumentNumberGeneratorDelegate implements JavaDelegate {
    public FixedValue type;                                     // injected from the step's `fields`
    private final SalesInvoiceRepository repository = new SalesInvoiceRepository();

    @Override public void execute(DelegateExecution execution) {
        SalesInvoiceEntity invoice = repository.findById(((Number) execution.getVariable("Id")).intValue());
        invoice.Number = new DocumentNumberGenerator().generateByType(type.getExpressionText());
        repository.updateWithoutEvent(invoice);                 // system write: no "-updated" event
    }
}
```

The split is deliberate: the *number-formatting* logic (`DocumentNumberGenerator`) is entity-agnostic, so it lives once in the `numbers` module and is reused by every document module; the *delegate* that touches the invoice belongs in the invoice module, because it must go through that entity's generated repository. Custom code, written once, reused across the whole suite - and still never touched by regeneration.

> 📸 *Screenshot: the web IDE editing the delegate - cross-module `import custom.numbers.DocumentNumberGenerator` resolved by the language server.*

## Three things that will save you an hour

Because client Java compiles as one in-process batch, a few rules matter in practice:

- **Always use a named package.** A class in the default package cannot be imported or referenced from the generated repository - so the calculated action above declares `package custom.sales_invoices;`. The entity's `imports:` must import it by that fully-qualified name (or you give the action's fully-qualified class name directly).
- **One bad file fails the whole batch.** All client `.java` across all projects compile together each cycle. A single file that does not compile takes down **every** project's Java endpoints with a 404 - not just the broken one. If Java routes vanish wholesale, look for one uncompilable source.
- **Delete offers to unpublish.** A published `.java` lives in the registry, compiled and served independently of your workspace copy - so deleting the file on its own would leave the served class behind. That is why the IDE **always asks whether to unpublish** when you delete a file: unpublishing removes it from the registry. Accept and the served copy is gone; decline and it lingers until you unpublish (or re-publish).

## The point

You did not fork the framework, override a generated file, or drop out of the platform. You declared a hook in the model and wrote one small class in `custom/`, with the same editing experience you would get in a desktop IDE. Regenerate the app as often as you like - your code stays put.

That is the balance Dirigible strikes: **low-code where you can, real code where you must** - in one environment, in the browser. Clone [sample-intent-multi-model](https://github.com/dirigiblelabs/sample-intent-multi-model) and try swapping the implementation yourself.
