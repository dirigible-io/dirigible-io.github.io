---
title: Code style
description: Formatting, license headers, conventions enforced by CI.
---

# Code style

CI fails the build on style violations - run formatting before every push.

## Java formatter

The format definition is `dirigible-formatter.xml` at the repo root. Apply with:

```bash
mvn formatter:format            # whole project
mvn -pl <module> formatter:format   # one module
```

CI runs `mvn -T 1C formatter:validate` and fails on any violation. The IDE save action (Eclipse / IntelliJ / VS Code) can apply the formatter on save - see `CONTRIBUTING.md` in the platform repo.

## License headers

Every `.java` / `.js` / `.properties` file carries the EPL-2.0 header. Add or refresh with:

```bash
mvn license:format -P license -DskipExistingHeaders=false
```

The default `mvn install` profile sets `license.skip=false`, so headers are validated as part of a normal build. Local-iteration profiles (`quick-build`) often skip the check.

## Conventions

- **Always write production-ready Java.** Single-responsibility methods, intention-revealing names, correct visibility, immutability (prefer `final`), proper resource handling (try-with-resources), precise exception handling, no commented-out blocks, no dead code, no swallowed exceptions.

- **Constructor injection only.** Every Spring bean (`@Component` / `@Service` / `@Repository` / `@Configuration` / `@RestController`) receives collaborators through the constructor and holds them in `private final` fields. No `@Autowired` on fields, no setter injection. The single documented exception is Quartz `Job` classes (instantiated reflectively before Spring autowiring runs) - they keep `@Autowired` field injection.

- **Package-private by default.** Drop `public` from any class/interface/enum used only within its own Java package. Cross-package types within the same Maven module need `public`. SPI types stay `public`. Documented exceptions: Quartz `Job` classes and Spring Data repositories.

- **Always log the throwable.** Every `catch` block's log call must pass the exception as the trailing SLF4J argument - `logger.error("...", ex)`, not `logger.error("..." + ex.getMessage())`. The throwable goes through SLF4J's out-of-band slot; the `{}` placeholder count stays balanced.

- **Configuration through `DirigibleConfig` / `Configuration`.** Add new tunables to the enum, not ad-hoc `System.getProperty` calls.

- **Bean-definition overriding is enabled.** Duplicate `@Bean` names silently shadow each other - be deliberate.

- **JPA scan packages** are `org.eclipse.dirigible.components` and `org.eclipse.dirigible.engine`. New entities under either tree are picked up automatically.

- **Cross-module FK cascades** use `@org.hibernate.annotations.OnDelete(action = OnDeleteAction.CASCADE)` to avoid forming a Maven dependency cycle through JPA's bidirectional cascade. See `RoleSynchronizerCleanupIT` for the canonical case.

## See also

- [Building from source](/help/contributing/building-from-source)
- [Testing](/help/contributing/testing)
- [Documentation contributing](/help/contributing/documentation)
