---
title: "Attack of the Decorators - A New Hope for Eclipse Dirigible Developers"
description: "The Attack of the Decorators is here, and with it comes a wave of new TypeScript superpowers that dramatically simplify Dependency Injection, Entities, Jobs, Listeners, WebSockets, Controllers, Roles, and Extensions."
author: Nedelcho Delchev
author_gh_user: delchev
author_avatar: https://avatars.githubusercontent.com/u/6852373?v=4
read_time: 5 min
publish_date: December 04, 2025
---

In a galaxy not so far away - specifically, the Dirigible runtime - a silent revolution has begun.
Where once developers roamed the dusty deserts of boilerplate code, a new army has emerged: Decorators.

Elegant. Precise. Opinionated.

<img src="../../../../images/decorators/decorators-jedi.jpg" alt="decorators-jedi.jpg">

Some call them syntactic sugar.
Others call them magic.
But in Dirigible… they are *the chosen ones*.

The Attack of the Decorators is here, and with it comes a wave of new TypeScript superpowers that dramatically simplify Dependency Injection, Entities, Jobs, Listeners, WebSockets, Controllers, Roles, and Extensions.

Let us witness the rise of this new army - and the fall of verbosity.

## Episode I: The Phantom Dependency Injection

For years, Jedi developers manually wired components together using pure JavaScript. But those days are over.

The Dependency Injection Decorators have arrived:

* `@Component`
* `@Injected`
* `@Inject`

You can now summon your services as easily as calling the Force.

Across the sand dunes of *PaymentComponent.ts*:

```ts
@Component('myPaymentService')
export class PaymentComponent {
    public doPayment(paymentData: any): any {
        return { status: "OK", data: paymentData };
    }
}
```

And in the hidden temple of *OrderProcessor.ts*:

```ts
@Injected()
class OrderProcessor {

    @Inject('myPaymentService')
    paymentComponent!: PaymentComponent;

}
```

No XML holocrons. No config files. The Force binds everything together.

GitHub Sample: [dirigiblelabs/sample-component-decorators](https://github.com/dirigiblelabs/sample-component-decorators)

## Episode II: Attack of the Cron Expressions

They said jobs were difficult.
They said scheduling was tedious.
But they had not met the `@Scheduled` decorator.

```ts
@Scheduled({ expression: "0/10 * * * * ?" })
export class MyJob {
    run() {
        console.log("MyJob executed!");
    }
}
```

Every 10 seconds, a new execution. Like clockwork. Like droids marching across Geonosis.

GitHub Sample: [dirigiblelabs/sample-job-decorator](https://github.com/dirigiblelabs/sample-job-decorator)

## Episode III: Revenge of the Listeners

A disturbance in the queue you sense…
A message is coming.

And who will answer?
A Listener will.

```ts
@Listener({
    name: "sample-listener-decorator/OrderListener",
    kind: "queue"
})
export class OrderListener {
    public static onMessage(message: string) {
        console.log("Processing message event:", message);
    }
}
```

A producer triggers it.
The Listener awakens.
Balance is restored.

GitHub Sample: [dirigiblelabs/sample-listener-decorator](https://github.com/dirigiblelabs/sample-listener-decorator)

<img src="../../../../images/decorators/decorators-clones.jpg" alt="decorators-clones.jpg">

## Episode IV: A New WebSocket

The Clone Army now spans galaxies — including the real-time domain.

WebSockets join the battle with the `@Websocket` decorator:

```ts
@Websocket({
    name: "sample-websocket-decorator/OrderWebsocket",
    endpoint: "order-ws"
})
export class OrderWebsocket {
    public static onMessage(message: string) {
        return `Hello from OrderWebsocket! [${message}]`;
    }
}
```

Connections open.
Messages fly.
The council approves.

GitHub Sample: [dirigiblelabs/sample-websocket-decorator](https://github.com/dirigiblelabs/sample-websocket-decorator)

## Episode V: The ORM Strikes Back

The Entity decorators bring order to the database. An entire Jedi Archive — structured, typed, documented.

Decorators include:

* `@Entity`
* `@Table`
* `@Column`
* `@Id`
* `@Generated`
* `@Documentation`
* `@OneToMany`, `@ManyToOne`

```ts
@Entity("CountryEntity")
@Table("SAMPLE_COUNTRY")
export class CountryEntity {

    @Id()
    @Generated("sequence")
    @Column({ name: "COUNTRY_ID", type: "long" })
    public Id?: number;

    @Column({ name: "COUNTRY_NAME", type: "string" })
    public Name?: string;
}
```

Repositories? Also decorated.
Controllers? Also decorated.
Together, they form the Republic.

GitHub Sample: [dirigiblelabs/sample-entity-decorators](https://github.com/dirigiblelabs/sample-entity-decorators)

<img src="../../../../images/decorators/decorators-dirigible.jpg" alt="decorators-dirigible.jpg">

## Episode VI: Return of the Extensions

Through the `@Extension` decorator, modules can add capabilities to others across the platform — like Jedi teachings passed between temples.

```ts
@Extension({
    name: "OrderExtension",
    to: "order-extension-point"
})
export class OrderExtension {
    public static getDiscount(): number {
        return 5;
    }
}
```

Other modules discover these extensions, aggregate them, and weave new logic.

GitHub Sample: [dirigiblelabs/sample-extension-decorator](https://github.com/dirigiblelabs/sample-extension-decorator)

## Episode VII: The Role Awakens

Security is strong in this one.

The `@Roles` decorator ensures only chosen users can access the protected paths of the application:

```ts
@Roles(["ADMINISTRATOR"])
class RolesCheck {
    public getMessage() {
        return {
            message: "Roles Check",
            user: user.getName(),
            date: new Date()
        };
    }
}
```

Access control has never been more cinematic.

GitHub Sample: [dirigiblelabs/sample-roles-decorator](https://github.com/dirigiblelabs/sample-roles-decorator)

## Episode VIII: The Controller Menace

HTTP controllers now join the decor family:

* `@Controller`
* `@Get`
* `@Post`
* `@Put`
* `@Delete`
* `@Documentation`

A simple controller suddenly looks like a polished Jedi Master:

```ts
@Controller
class CountryController {

    @Get("/")
    public getAll(): any[] {
        return this.countries;
    }
}
```

No friction. No config. No empire.

## The Decorator Order is Here

With the arrival of decorators in Eclipse Dirigible:

* Dependency Injection becomes seamless
* Jobs become declarative
* Listeners become elegant
* WebSockets become structured
* Entities become readable
* Extensions become modular
* Roles become enforceable
* Controllers become beautiful

This is not an evolution.
This is a Clone Army of productivity.

The Attack of the Decorators is not an attack on the developer — it’s an attack on complexity.
A battle we’re finally winning.

May the Source be with you!