---
title: Dialog
---

Dialog
===

Controls system dialogs. Extends [MessageHub](../message-hub).

=== "Overview"
- Module: `platform-core`
- Source: [platform-core/ui/platform/dialog-hub.js](https://github.com/eclipse/dirigible/blob/master/components/platform/platform-core/src/main/resources/META-INF/dirigible/platform-core/ui/platform/dialog-hub.js)
- Web Link: `/services/web/platform-core/ui/platform/dialog-hub.js`
- Status: `stable`
- Group: `platform`

### Basic Usage

If you are using the standard Dirigible view configuration, dialog support is automatically enabled.

If the view is expected to work outside the platform, then you must include `platformDialogs` in your view:

```javascript
const exampleView = angular.module('exampleView', [
    'blimpKit',
    'platformView',
    'platformDialogs'
]);
```

If you are making a custom view, you can include the API using the web link above.

To initialize it:

```javascript
const dialogHub = new DialogHub();
```

```html
<body>
    <dialogs></dialogs>
</body>
```

!!! Note
	Use the `dialogs` tag <b>only</b> if the view is expected to work outside Dirigible.

## Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**showAlert(AlertObject)**   | Opens an alert dialog. | *Promise*
**onAlert(handlerFunc)**   | Registers a listener. Triggered when an alert dialog should be shown. Returns a function to unregister the listener. | *function*
**showDialog(DialogObject)**   | Opens a dialog. | *Promise*
**onDialog(handlerFunc)**   | Registers a listener. Triggered when a dialog should be shown. Returns a function to unregister the listener. | *function*
**showBusyDialog(message)**   | Opens a dialog. | -
**onBusyDialog(handlerFunc)**   | Registers a listener. Triggered when a busy dialog should be shown. Returns a function to unregister the listener. | *function*
**closeBusyDialog()**   | Closes the current busy dialog. | -
**showFormDialog(FormObject)**   | Opens a form dialog. | *Promise*
**onFormDialog(handlerFunc)**   | Registers a listener. Triggered when a form dialog should be shown. Returns a function to unregister the listener. | *function*
**showWindow(WindowObject)**   | Opens a dialog window. | *Promise*
**onWindow(handlerFunc)**   | Registers a listener. Triggered when a dialog window should be shown. Returns a function to unregister the listener. | *function*

## Typedefs

<dl>
<dt><a href="#AlertObject">AlertObject</a> : <code>Object</code></dt>
</dd>
<dt><a href="#DialogObject">DialogObject</a> : <code>Object</code></dt>
</dd>
<dt><a href="#FormItem">FormItem</a> : <code>Object</code></dt>
</dd>
<dt><a href="#FormObject">FormObject</a> : <code>Object</code></dt>
</dd>
<dt><a href="#WindowObject">WindowObject</a> : <code>Object</code></dt>
</dd>
</dl>

!!! Note
	Params in square brackets are optional.

<a name="AlertObject"></a>

## AlertTypes : <code>Object</code>

**Properties**

| Param | Type | Description |
| --- | --- | --- |
| Confirmation | <code>string</code> | Confirmation type. |
| Error | <code>string</code> | Error type. |
| Success | <code>string</code> | Success type. |
| Warning | <code>string</code> | Warning type. |
| Information | <code>string</code> | Information type. |

## AlertObject : <code>Object</code>

**Properties**

| Param | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | The title for the alert. |
| message | <code>string</code> | The message that will be displayed inside the alert. |
| [type] | <code>string</code> | The type of the alert. See 'AlertTypes'. |
| [preformatted] | <code>boolean</code> | Newline formatting of the message. If set to true, text will be displayed as-is without formatting it. Defaults to false. |
| [buttons] | <code>Array.&lt;Object&gt;</code> | List of objects, describing a button. The object must contain an 'id', 'label' and optionally 'state' (See ButtonStates). |

<a name="DialogObject"></a>

## DialogObject : <code>Object</code>

**Properties**

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [header] | <code>string</code> |  | The header of the dialog. |
| title | <code>string</code> |  | The title for the dialog. |
| [subheader] | <code>string</code> |  | The subheader of the dialog. |
| message | <code>string</code> |  | The message that will be displayed inside the dialog. |
| [preformatted] | <code>boolean</code> |  | Newline formatting of the message. If set to true, text will be displayed as-is without formatting it. Defaults to false. |
| [buttons] | <code>Array.&lt;Object&gt;</code> |  | List of objects, describing a button. The object must contain an 'id', 'label' and optionally 'state' (See ButtonStates). |
| [closeButton] | <code>boolean</code> | <code>true</code> | Should the dialog have a close button in the title bar. Defaults to true. |

<a name="FormItem"></a>

## FormItem : <code>Object</code>
A form item can describe several types of form inputs. Some properties are common for all and some are type specific.

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| controlType | <code>&#x27;input&#x27;</code> \| <code>&#x27;textarea&#x27;</code> \| <code>&#x27;checkbox&#x27;</code> \| <code>&#x27;radio&#x27;</code> \| <code>&#x27;dropdown&#x27;</code> |  | Type of input. Common property. |
| label | <code>string</code> |  | Label for the input. Common property. |
| [value] | <code>string</code> \| <code>number</code> \| <code>object</code> |  | Value of the input. Common property. |
| type | <code>&#x27;text&#x27;</code> \| <code>&#x27;password&#x27;</code> \| <code>&#x27;number&#x27;</code> \| <code>&#x27;date&#x27;</code> \| <code>&#x27;color&#x27;</code> \| <code>&#x27;email&#x27;</code> \| <code>&#x27;tel&#x27;</code> \| <code>&#x27;time&#x27;</code> \| <code>&#x27;url&#x27;</code> \| <code>&#x27;datetime-local&#x27;</code> |  | Type for the input. Specific to the 'input' control type. |
| [placeholder] | <code>string</code> |  | Placeholder text for the 'input', 'textarea' and 'dropdown' control types. |
| [required] | <code>boolean</code> |  | Sets the input as required. Common for all control types except 'checkbox'. |
| [disabled] | <code>boolean</code> |  | Sets the input as disabled. Common for all control types. On 'radio', it disables all options. |
| [focus] | <code>boolean</code> |  | Sets the input as focus, once the dialog appears. Common for all control types except 'checkbox', 'radio' and 'dropdown'. |
| [maxlength] | <code>number</code> |  | Maximum character length for the input. Common for the 'input' and 'textarea' control types. |
| [minlength] | <code>number</code> |  | Minimum character length for the input. Common for the 'input' and 'textarea' control types. |
| [max] | <code>number</code> \| <code>string</code> |  | Maximum value for the input. Only for the 'input' control of the 'number', 'date', 'time' and 'datetime-local' types. |
| [min] | <code>number</code> \| <code>string</code> |  | Minimum value for the input. Only for the 'input' control of the 'number', 'date', 'time' and 'datetime-local' types. |
| [rows] | <code>number</code> | <code>3</code> | Number of rows. Only for the 'input' control of the 'textarea'. |
| [step] | <code>number</code> |  | Value step for the input. Only for the 'input' control of the 'number' type. |
| [inputRules] | <code>Object</code> |  | Validation rules for the input. The 'excluded' array can contain strings that the input should not match. The 'patterns' array can contain regex expressions for validating the input. Common for the 'input' and 'textarea' control types. |
| [submitOnEnter] | <code>boolean</code> |  | If the user hits the enter key, while this input is focused, the form will get submitted. Valid only for the 'input' control type. |
| options | <code>Array.&lt;{label: string, value: (string\|number)}&gt;</code> |  | Options for the control type 'dropdown'. |
| [errorMsg] | <code>string</code> |  | The error hint that will be displayed, when the selected value is invalid. Common for all control types except 'checkbox' and 'radio'. |
| [enabledOn] | <code>Object</code> |  | Enables a control based on the state of another control. The 'key' property is the id of the target control. The 'value' is the value of the target control. If you only provide the key, it will get enabled when the target control has any valid value. If you also provide the value, it will get enabled when the target control's value matches. |
| [disabledOn] | <code>Object</code> |  | Same as 'enabledOn' but with an opposite effect. |
| [visibleOn] | <code>Object</code> |  | Same as 'enabledOn' but instead of disabling/enabling the control, it will show/hide it. |
| [hiddenOn] | <code>Object</code> |  | Same as 'visibleOn' but with an opposite effect. |

<a name="FormObject"></a>

## FormObject : <code>Object</code>

**Properties**

| Param | Type | Description |
| --- | --- | --- |
| [header] | <code>string</code> | The header of the dialog. |
| title | <code>string</code> | The title for the dialog. |
| [subheader] | <code>string</code> | The subheader of the dialog. |
| form | <code>Object.&lt;string, FormItem&gt;</code> | Object containing form item definitions. The key for each definition is used as id. |
| [submitLabel] | <code>string</code> | Label for the submit button. |
| [cancelLabel] | <code>string</code> | Label for the cancel button. |
| [width] | <code>string</code> | Custom width for the window. This maps to the CSS width propery. |
| [height] | <code>string</code> | Custom height for the window. This maps to the CSS height propery. |
| [maxWidth] | <code>string</code> | Custom max width for the window. This maps to the CSS max-width propery. |
| [maxHeight] | <code>string</code> | Custom max height for the window. This maps to the CSS max-height propery. |
| [minWidth] | <code>string</code> | Custom min width for the window. This maps to the CSS min-width propery. |
| [minHeight] | <code>string</code> | Custom min height for the window. This maps to the CSS min-height propery. |

<a name="WindowObject"></a>

## WindowObject : <code>Object</code>

**Properties**

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [hasHeader] | <code>boolean</code> | <code>true</code> | If the dialog should have a header. |
| [header] | <code>string</code> |  | The header of the dialog. |
| [title] | <code>string</code> |  | The title for the window. Use this only when providing a custom path, instead of widnow id. |
| [subheader] | <code>string</code> |  | The subheader of the dialog. |
| [id] | <code>string</code> |  | ID of the view that should be opened inside the dialog window. Alternatevly, you can use 'path' instead and provide a direct URL. |
| [path] | <code>string</code> |  | When showing a custom view, you can provide a direct URL. |
| [params] | <code>Object</code> |  | Parameters that will be provided as a 'data-parameters' attribute that the view can read. |
| [width] | <code>string</code> | <code>&quot;95%&quot;</code> | Custom width for the window. This maps to the CSS width propery. |
| [heigh] | <code>string</code> | <code>&quot;90%&quot;</code> | Custom height for the window. This maps to the CSS height propery. |
| [maxWidth] | <code>string</code> | <code>&quot;1280px&quot;</code> | Custom max width for the window. This maps to the CSS max-width propery. |
| [maxHeight] | <code>string</code> | <code>&quot;768px&quot;</code> | Custom max height for the window. This maps to the CSS max-height propery. |
| [minWidth] | <code>string</code> |  | Custom min width for the window. This maps to the CSS min-width propery. |
| [minHeight] | <code>string</code> |  | Custom min height for the window. This maps to the CSS min-height propery. |
| [callbackTopic] | <code>string</code> |  | Callback topic for when the window has been closed. |
| [closeButton] | <code>boolean</code> | <code>true</code> | Should the dialog have a close button in the title bar. |

## Example

```javascript
dialogHub.showFormDialog({
    title: "What's your nickname?",
    form: {
        'nick': {
            label: 'Nickname',
            controlType: 'input',
            type: 'text',
            placeholder: 'Current nickname',
            submitOnEnter: true,
            focus: true,
            required: true
        },
    },
    submitLabel: 'Submit',
    cancelLabel: 'Cancel'
}).then((form) => {
    if (form) {
        console.log(form['nick']);
    }
});
```

For a full example you can look at [sample-platform](https://github.com/dirigiblelabs/sample-platform).