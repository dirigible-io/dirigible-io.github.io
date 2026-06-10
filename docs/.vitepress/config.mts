import { defineConfig } from 'vitepress'
import type { Plugin } from 'vite'

// Vite plugin: pre-process .md files to escape angle-bracket patterns that Vue
// would misparse as HTML/component tags (e.g. generic type params, placeholders).
function escapeMdAngleBrackets(): Plugin {
  const KNOWN_HTML = new Set([
    'a','abbr','address','area','article','aside','audio','b','base','bdi','bdo',
    'blockquote','body','br','button','canvas','caption','cite','code','col',
    'colgroup','data','datalist','dd','del','details','dfn','dialog','div','dl',
    'dt','em','embed','fieldset','figcaption','figure','footer','form','h1','h2',
    'h3','h4','h5','h6','head','header','hr','html','i','iframe','img','input',
    'ins','kbd','label','legend','li','link','main','map','mark','menu','meta',
    'meter','nav','noscript','object','ol','optgroup','option','output','p',
    'picture','pre','progress','q','rp','rt','ruby','s','samp','script','section',
    'select','small','source','span','strong','style','sub','summary','sup',
    'table','tbody','td','template','textarea','tfoot','th','thead','time',
    'title','tr','track','u','ul','var','video','wbr',
  ])

  return {
    name: 'escape-md-angle-brackets',
    transform(code, id) {
      if (!id.endsWith('.md')) return
      // Replace <Word> patterns outside code fences/spans that aren't known HTML tags
      const result = escapeNonHtmlTags(code)
      return result !== code ? { code: result } : null
    },
  }
}

function escapeNonHtmlTags(src: string): string {
  const KNOWN_HTML = new Set([
    'a','abbr','address','area','article','aside','audio','b','base','bdi','bdo',
    'blockquote','body','br','button','canvas','caption','cite','code','col',
    'colgroup','data','datalist','dd','del','details','dfn','dialog','div','dl',
    'dt','em','embed','fieldset','figcaption','figure','footer','form','h1','h2',
    'h3','h4','h5','h6','head','header','hr','html','i','iframe','img','input',
    'ins','kbd','label','legend','li','link','main','map','mark','menu','meta',
    'meter','nav','noscript','object','ol','optgroup','option','output','p',
    'picture','pre','progress','q','rp','rt','ruby','s','samp','script','section',
    'select','small','source','span','strong','style','sub','summary','sup',
    'table','tbody','td','template','textarea','tfoot','th','thead','time',
    'title','tr','track','u','ul','var','video','wbr',
  ])
  const lines = src.split('\n')
  let inFence = false
  const out: string[] = []
  for (const line of lines) {
    if (/^```/.test(line)) {
      inFence = !inFence
      out.push(line)
      continue
    }
    if (inFence) {
      out.push(line)
      continue
    }
    // Outside code fences: escape non-HTML angle-bracket tokens in text parts
    // (skip content inside backtick spans)
    out.push(escapeLineNonHtml(line, KNOWN_HTML))
  }
  return out.join('\n')
}

function escapeLineNonHtml(line: string, known: Set<string>): string {
  // Split line by inline code backticks; only process even-index chunks (outside backticks)
  const parts = line.split('`')
  return parts
    .map((part, idx) => {
      if (idx % 2 !== 0) return part // inside backtick span → leave alone
      return part.replace(/<\/?([A-Za-z][A-Za-z0-9_.-]*)(\s[^>]*)?>|<([A-Za-z][A-Za-z0-9_.-]*)>/g,
        (match, tag1, _attrs, tag2) => {
          const tag = (tag1 || tag2 || '').toLowerCase()
          if (known.has(tag)) return match
          return match.replace(/</g, '&lt;').replace(/>/g, '&gt;')
        })
    })
    .join('`')
}

export default defineConfig({
  vite: {
    plugins: [escapeMdAngleBrackets()],
  },
  title: 'Eclipse Dirigible',
  description: 'High-Productivity Application Platform — in-system development tools and a runtime environment',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@iconscout/unicons@4.0.8/css/line.css' }],
    ['meta', { property: 'og:title', content: 'Eclipse Dirigible — High-Productivity Application Platform' }],
    ['meta', { property: 'og:description', content: 'Eclipse Dirigible provides development tools and a runtime environment supporting the full lifecycle of cloud applications.' }],
    ['meta', { property: 'og:image', content: 'https://www.dirigible.io/img/logo/dirigible-logo.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: 'Eclipse Dirigible' }],
    ['meta', { name: 'twitter:description', content: 'High-Productivity Application Platform' }],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=UA-49027147-1' },
    ],
    [
      'script',
      {},
      "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','UA-49027147-1');",
    ],
  ],
  base: '/',
  ignoreDeadLinks: true,
  sitemap: { hostname: 'https://www.dirigible.io/' },
  cleanUrls: true,
  appearance: {
    // @ts-expect-error not fully supported yet
    initialValue: 'dark',
  },
  themeConfig: {
    logo: '/img/logo/dirigible.svg',
    outline: 'deep',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/help/' },
      { text: 'SDK', link: '/sdks/' },
      { text: 'Blog', link: '/blogs/' },
      {
        text: 'More',
        items: [
          { text: 'Releases', link: '/releases/' },
          { text: 'Downloads', link: 'https://downloads.dirigible.io' },
          { text: 'GitHub', link: 'https://github.com/eclipse/dirigible' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/eclipse/dirigible' },
      { icon: 'twitter', link: 'https://twitter.com/dirigible_io' },
      { icon: 'youtube', link: 'https://www.youtube.com/c/dirigibleio' },
    ],
    editLink: {
      pattern: 'https://github.com/dirigible-io/dirigible-io.github.io/edit/master/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: 'Released under the <a href="https://www.eclipse.org/legal/epl-v20.html">EPL-2.0 License</a>.',
      copyright: 'Copyright © 2010-2026 Eclipse Dirigible contributors',
    },
    sidebar: {
      '/help/': helpSidebar(),
      '/api/': apiSidebar(),
      '/sdk/': sdkSidebar(),
    },
    search: {
      provider: 'local',
    },
  },
})

function helpSidebar() {
  return [
    {
      text: 'Getting Started',
      collapsed: false,
      items: [
        { text: 'Welcome', link: '/help/' },
        { text: 'Development', link: '/help/development/' },
      ],
    },
    {
      text: 'Tutorials',
      collapsed: true,
      items: [
        {
          text: 'Bookstore Application',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/tutorials/application-development/bookstore/' },
            { text: 'Database', link: '/help/tutorials/application-development/bookstore/database' },
            { text: 'API', link: '/help/tutorials/application-development/bookstore/api' },
            { text: 'User Interface', link: '/help/tutorials/application-development/bookstore/ui' },
          ],
        },
        {
          text: 'Scheduled Job',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/tutorials/application-development/scheduled-job/' },
            { text: 'Database', link: '/help/tutorials/application-development/scheduled-job/database' },
            { text: 'Job Handler', link: '/help/tutorials/application-development/scheduled-job/handler' },
            { text: 'Scheduled Job', link: '/help/tutorials/application-development/scheduled-job/job' },
          ],
        },
        { text: 'File Upload', link: '/help/tutorials/application-development/file-upload' },
        { text: 'Shell Command', link: '/help/tutorials/application-development/shell-command' },
        { text: 'Listener of a Queue', link: '/help/tutorials/application-development/listener-queue' },
        { text: 'Kafka Producer and Consumer', link: '/help/tutorials/application-development/kafka' },
        { text: 'Generate Application from Model', link: '/help/tutorials/modeling/generate-application-from-model' },
        { text: 'Generate Application from Datasource', link: '/help/tutorials/modeling/generate-application-from-datasource' },
        { text: 'BPMN Process', link: '/help/tutorials/modeling/bpmn-process' },
        {
          text: 'IDE Customizations',
          collapsed: true,
          items: [
            { text: 'Create a View', link: '/help/tutorials/customizations/ide/create-view' },
            { text: 'Create a Perspective', link: '/help/tutorials/customizations/ide/create-perspective' },
          ],
        },
        {
          text: 'Custom Stack',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/tutorials/customizations/custom-stack/' },
            { text: 'Project Structure', link: '/help/tutorials/customizations/custom-stack/project-structure' },
            { text: 'Branding', link: '/help/tutorials/customizations/custom-stack/branding' },
            { text: 'Facade', link: '/help/tutorials/customizations/custom-stack/facade' },
            { text: 'Advanced Facade', link: '/help/tutorials/customizations/custom-stack/advanced-facade' },
            { text: 'Dependency', link: '/help/tutorials/customizations/custom-stack/dependency' },
          ],
        },
      ],
    },
    {
      text: 'Setup',
      collapsed: true,
      items: [
        { text: 'Tomcat', link: '/help/setup/' },
        { text: 'Docker', link: '/help/setup/docker' },
        {
          text: 'Kubernetes',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/setup/kubernetes/' },
            { text: 'Google Kubernetes Engine', link: '/help/setup/kubernetes/google-kubernetes-engine' },
            { text: 'Azure Kubernetes Service', link: '/help/setup/kubernetes/azure-kubernetes-service' },
            { text: 'Red Hat OpenShift', link: '/help/setup/kubernetes/red-hat-openshift' },
            { text: 'SAP BTP Kyma', link: '/help/setup/kubernetes/sap-btp-kyma' },
            { text: 'Helm', link: '/help/setup/kubernetes/helm' },
            {
              text: 'Addons',
              collapsed: true,
              items: [
                { text: 'Keycloak', link: '/help/setup/kubernetes/addons/keycloak' },
                { text: 'PostgreSQL', link: '/help/setup/kubernetes/addons/postgresql' },
                { text: 'GCP DNS Zone', link: '/help/setup/kubernetes/addons/google-dns-zone' },
                { text: 'GKE cluster', link: '/help/setup/kubernetes/addons/gke-cluster' },
                { text: 'Azure DNS Zone', link: '/help/setup/kubernetes/addons/azure-dns-zone' },
                { text: 'Letsencrypt', link: '/help/setup/kubernetes/addons/letsencrypt' },
                { text: 'Istio', link: '/help/setup/kubernetes/addons/istio' },
              ],
            },
          ],
        },
        { text: 'Cloud Foundry', link: '/help/setup/cloud-foundry' },
        { text: 'Environment Variables', link: '/help/setup/setup-environment-variables' },
      ],
    },
    {
      text: 'Overview',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/help/overview/' },
        { text: 'Features', link: '/help/overview/features' },
        { text: 'Architecture', link: '/help/overview/architecture' },
        { text: 'Editors & Modelers', link: '/help/overview/editors-modelers' },
        { text: 'Engines', link: '/help/overview/engines' },
        { text: 'Runtime Services', link: '/help/overview/runtime-services' },
        {
          text: 'Artifacts',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/development/artifacts/' },
            { text: 'Data Files', link: '/help/development/artifacts/data-files' },
            { text: 'Database Table', link: '/help/development/artifacts/database-table' },
          ],
        },
        {
          text: 'Concepts',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/development/concepts/' },
            { text: 'Dynamic Applications', link: '/help/development/concepts/dynamic-applications' },
            { text: 'Entity Service', link: '/help/development/concepts/entity-service' },
            { text: 'Generation', link: '/help/development/concepts/generation' },
            { text: 'Mobile Applications', link: '/help/development/concepts/mobile-apps' },
            { text: 'Publishing', link: '/help/development/concepts/publishing' },
            { text: 'Registry', link: '/help/development/concepts/registry' },
            { text: 'Repository', link: '/help/development/concepts/repository' },
            { text: 'REST', link: '/help/development/concepts/rest' },
            { text: 'Web Content', link: '/help/development/concepts/web-content' },
            { text: 'Workspace', link: '/help/development/concepts/workspace' },
          ],
        },
      ],
    },
    {
      text: 'IDE',
      collapsed: true,
      items: [
        { text: 'IDE Overview', link: '/help/development/ide/' },
        { text: 'About', link: '/help/development/ide/about' },
        { text: 'Access Editor', link: '/help/development/ide/editor-access' },
        { text: 'CSV Editor', link: '/help/development/ide/editor-csv' },
        { text: 'CSVIM Editor', link: '/help/development/ide/editor-csvim' },
        { text: 'Monaco Editor', link: '/help/development/ide/editor-monaco' },
        { text: 'Scopes Editor', link: '/help/development/ide/editor-scopes' },
        {
          text: 'Modelers',
          collapsed: true,
          items: [
            { text: 'BPMN', link: '/help/development/ide/modelers/bpmn' },
            { text: 'Database Schema', link: '/help/development/ide/modelers/database-schema' },
            { text: 'Entity Data', link: '/help/development/ide/modelers/entity-data' },
            { text: 'Form Designer', link: '/help/development/ide/modelers/form-designer' },
          ],
        },
        {
          text: 'Perspectives',
          collapsed: true,
          items: [
            { text: 'Database', link: '/help/development/ide/perspectives/database' },
            { text: 'Documents', link: '/help/development/ide/perspectives/documents' },
            { text: 'Git', link: '/help/development/ide/perspectives/git' },
            { text: 'Operations', link: '/help/development/ide/perspectives/operations' },
            { text: 'Workbench', link: '/help/development/ide/perspectives/workbench' },
          ],
        },
        {
          text: 'Views',
          collapsed: true,
          items: [
            { text: 'Access', link: '/help/development/ide/views/access' },
            { text: 'Configurations', link: '/help/development/ide/views/configurations' },
            { text: 'Console', link: '/help/development/ide/views/console' },
            { text: 'Database', link: '/help/development/ide/views/database' },
            { text: 'Debugger', link: '/help/development/ide/views/debugger' },
            { text: 'Extensions', link: '/help/development/ide/views/extensions' },
            { text: 'Git Projects', link: '/help/development/ide/views/git' },
            { text: 'Import', link: '/help/development/ide/views/import' },
            { text: 'Jobs', link: '/help/development/ide/views/jobs' },
            { text: 'Listeners', link: '/help/development/ide/views/listeners' },
            { text: 'Logs', link: '/help/development/ide/views/logs' },
            { text: 'Preview', link: '/help/development/ide/views/preview' },
            { text: 'Projects', link: '/help/development/ide/views/projects' },
            { text: 'Registry', link: '/help/development/ide/views/registry' },
            { text: 'Repository', link: '/help/development/ide/views/repository' },
            { text: 'Scopes', link: '/help/development/ide/views/scopes' },
            { text: 'Search', link: '/help/development/ide/views/search' },
            { text: 'Terminal', link: '/help/development/ide/views/terminal' },
          ],
        },
      ],
    },
    {
      text: 'Extensions',
      collapsed: true,
      items: [
        { text: 'Extensions Overview', link: '/help/development/extensions/' },
        { text: 'Template', link: '/help/development/extensions/template' },
      ],
    },
    {
      text: 'Developer Resources',
      collapsed: true,
      items: [
        { text: 'Development & Operations', link: '/help/development/devops' },
        { text: 'Keyboard Shortcuts', link: '/help/developer-resources/keyboard-shortcuts' },
        { text: 'Java Remote Debugging', link: '/help/developer-resources/java-remote-debugging' },
        { text: 'Cheat Sheet', link: '/help/developer-resources/cheat-sheet' },
        { text: 'FAQ', link: '/help/overview/faq' },
      ],
    },
    {
      text: 'Community',
      collapsed: true,
      items: [
        { text: 'Community', link: '/help/community' },
        { text: 'Credits', link: '/help/overview/credits' },
        { text: 'License', link: '/help/overview/license' },
      ],
    },
  ]
}

function apiSidebar() {
  return [
    { text: 'Overview', link: '/api/' },
    { text: 'Get Started', link: '/api/get-started' },
    {
      text: 'SDK',
      items: [
        {
          text: '@aerokit/sdk/http',
          collapsed: true,
          link: '/api/http/',
          items: [
            { text: 'HttpAsyncClient', link: '/api/http/client-async' },
            { text: 'HttpClient', link: '/api/http/client' },
            { text: 'Decorators', link: '/api/http/decorators' },
            { text: 'Errors', link: '/api/http/errors' },
            { text: 'ForbiddenError', link: '/api/http/errors/ForbiddenError' },
            { text: 'ValidationError', link: '/api/http/errors/ValidationError' },
            { text: 'Request', link: '/api/http/request' },
            { text: 'Response', link: '/api/http/response' },
            { text: 'RestService', link: '/api/http/rs' },
            { text: 'HttpController', link: '/api/http/rs/controller' },
            { text: 'ResourceMappings', link: '/api/http/rs/mappings' },
            { text: 'ResourceMethod', link: '/api/http/rs/method' },
            { text: 'Resource', link: '/api/http/rs/resource' },
            { text: 'Session', link: '/api/http/session' },
            { text: 'Upload', link: '/api/http/upload' },
            { text: 'HttpUtils', link: '/api/http/utils' },
          ],
        },
        {
          text: '@aerokit/sdk/db',
          collapsed: true,
          link: '/api/db/',
          items: [
            { text: 'DAO', link: '/api/db/dao' },
            { text: 'Database', link: '/api/db/database' },
            { text: 'Decorators', link: '/api/db/decorators' },
            { text: 'Insert', link: '/api/db/insert' },
            { text: 'ORM', link: '/api/db/orm' },
            { text: 'ORMStatements', link: '/api/db/ormstatements' },
            { text: 'Procedure', link: '/api/db/procedure' },
            { text: 'Query', link: '/api/db/query' },
            { text: 'Repository', link: '/api/db/repository' },
            { text: 'Sequence', link: '/api/db/sequence' },
            { text: 'SQL', link: '/api/db/sql' },
            { text: 'Store', link: '/api/db/store' },
            { text: 'Translator', link: '/api/db/translator' },
            { text: 'Update', link: '/api/db/update' },
          ],
        },
        {
          text: '@aerokit/sdk/core',
          collapsed: true,
          link: '/api/core/',
          items: [
            { text: 'Configurations', link: '/api/core/configurations' },
            { text: 'Context', link: '/api/core/context' },
            { text: 'Env', link: '/api/core/env' },
            { text: 'Globals', link: '/api/core/globals' },
          ],
        },
        {
          text: '@aerokit/sdk/bpm',
          collapsed: true,
          link: '/api/bpm/',
          items: [
            { text: 'Deployer', link: '/api/bpm/deployer' },
            { text: 'Process', link: '/api/bpm/process' },
            { text: 'Tasks', link: '/api/bpm/tasks' },
            { text: 'Tracer', link: '/api/bpm/tracer' },
            { text: 'Values', link: '/api/bpm/values' },
          ],
        },
        {
          text: '@aerokit/sdk/io',
          collapsed: true,
          link: '/api/io/',
          items: [
            { text: 'Bytes', link: '/api/io/bytes' },
            { text: 'Files', link: '/api/io/files' },
            { text: 'Image', link: '/api/io/image' },
            { text: 'Streams', link: '/api/io/streams' },
            { text: 'Zip', link: '/api/io/zip' },
          ],
        },
        {
          text: '@aerokit/sdk/component',
          collapsed: true,
          link: '/api/component/',
          items: [
            { text: 'Decorators', link: '/api/component/decorators' },
          ],
        },
        {
          text: '@aerokit/sdk/cache',
          collapsed: true,
          link: '/api/cache/',
          items: [
            { text: 'Cache', link: '/api/cache/cache' },
          ],
        },
        {
          text: '@aerokit/sdk/cms',
          collapsed: true,
          link: '/api/cms/',
          items: [
            { text: 'Cmis', link: '/api/cms/cmis' },
          ],
        },
        {
          text: '@aerokit/sdk/etcd',
          collapsed: true,
          link: '/api/etcd/',
          items: [
            { text: 'Client', link: '/api/etcd/client' },
          ],
        },
        {
          text: '@aerokit/sdk/extensions',
          collapsed: true,
          link: '/api/extensions/',
          items: [
            { text: 'Decorators', link: '/api/extensions/decorators' },
            { text: 'Extensions', link: '/api/extensions/extensions' },
          ],
        },
        {
          text: '@aerokit/sdk/git',
          collapsed: true,
          link: '/api/git/',
          items: [
            { text: 'Client', link: '/api/git/client' },
          ],
        },
        {
          text: '@aerokit/sdk/indexing',
          collapsed: true,
          link: '/api/indexing/',
          items: [
            { text: 'Searcher', link: '/api/indexing/searcher' },
            { text: 'Writer', link: '/api/indexing/writer' },
          ],
        },
        {
          text: '@aerokit/sdk/integrations',
          collapsed: true,
          link: '/api/integrations/',
          items: [
            { text: 'Integrations', link: '/api/integrations/integrations' },
          ],
        },
        {
          text: '@aerokit/sdk/job',
          collapsed: true,
          link: '/api/job/',
          items: [
            { text: 'Decorators', link: '/api/job/decorators' },
            { text: 'Scheduler', link: '/api/job/scheduler' },
          ],
        },
        {
          text: '@aerokit/sdk/junit',
          collapsed: true,
          link: '/api/junit/',
          items: [
            { text: 'JUnit', link: '/api/junit/junit' },
          ],
        },
        {
          text: '@aerokit/sdk/kafka',
          collapsed: true,
          link: '/api/kafka/',
          items: [
            { text: 'Consumer', link: '/api/kafka/consumer' },
            { text: 'Producer', link: '/api/kafka/producer' },
          ],
        },
        {
          text: '@aerokit/sdk/log',
          collapsed: true,
          link: '/api/log/',
          items: [
            { text: 'Logging', link: '/api/log/logging' },
          ],
        },
        {
          text: '@aerokit/sdk/mail',
          collapsed: true,
          link: '/api/mail/',
          items: [
            { text: 'MailClient', link: '/api/mail/client' },
          ],
        },
        {
          text: '@aerokit/sdk/messaging',
          collapsed: true,
          link: '/api/messaging/',
          items: [
            { text: 'Consumer', link: '/api/messaging/consumer' },
            { text: 'Decorators', link: '/api/messaging/decorators' },
            { text: 'Producer', link: '/api/messaging/producer' },
          ],
        },
        {
          text: '@aerokit/sdk/mongodb',
          collapsed: true,
          link: '/api/mongodb/',
          items: [
            { text: 'Client', link: '/api/mongodb/client' },
            { text: 'DAO', link: '/api/mongodb/dao' },
          ],
        },
        {
          text: '@aerokit/sdk/net',
          collapsed: true,
          link: '/api/net/',
          items: [
            { text: 'Decorators', link: '/api/net/decorators' },
            { text: 'SOAP', link: '/api/net/soap' },
            { text: 'Websockets', link: '/api/net/websockets' },
          ],
        },
        {
          text: '@aerokit/sdk/pdf',
          collapsed: true,
          link: '/api/pdf/',
          items: [
            { text: 'PDF', link: '/api/pdf/pdf' },
          ],
        },
        {
          text: '@aerokit/sdk/platform',
          collapsed: true,
          link: '/api/platform/',
          items: [
            { text: 'Command', link: '/api/platform/command' },
            { text: 'Engines', link: '/api/platform/engines' },
            { text: 'Lifecycle', link: '/api/platform/lifecycle' },
            { text: 'OS', link: '/api/platform/os' },
            { text: 'Problems', link: '/api/platform/problems' },
            { text: 'Registry', link: '/api/platform/registry' },
            { text: 'Repository', link: '/api/platform/repository' },
            { text: 'Workspace', link: '/api/platform/workspace' },
          ],
        },
        {
          text: '@aerokit/sdk/qldb',
          collapsed: true,
          link: '/api/qldb/',
          items: [
            { text: 'QLDBRepository', link: '/api/qldb/qldb' },
          ],
        },
        {
          text: '@aerokit/sdk/rabbitmq',
          collapsed: true,
          link: '/api/rabbitmq/',
          items: [
            { text: 'Consumer', link: '/api/rabbitmq/consumer' },
            { text: 'Producer', link: '/api/rabbitmq/producer' },
          ],
        },
        {
          text: '@aerokit/sdk/redis',
          collapsed: true,
          link: '/api/redis/',
          items: [
            { text: 'Client', link: '/api/redis/client' },
          ],
        },
        {
          text: '@aerokit/sdk/security',
          collapsed: true,
          link: '/api/security/',
          items: [
            { text: 'Decorators', link: '/api/security/decorators' },
            { text: 'OAuthClient', link: '/api/security/oauth' },
            { text: 'User', link: '/api/security/user' },
          ],
        },
        {
          text: '@aerokit/sdk/template',
          collapsed: true,
          link: '/api/template/',
          items: [
            { text: 'TemplateEngines', link: '/api/template/engines' },
          ],
        },
        {
          text: '@aerokit/sdk/utils',
          collapsed: true,
          link: '/api/utils/',
          items: [
            { text: 'Alphanumeric', link: '/api/utils/alphanumeric' },
            { text: 'Base64', link: '/api/utils/base64' },
            { text: 'Converter', link: '/api/utils/converter' },
            { text: 'Digest', link: '/api/utils/digest' },
            { text: 'Escape', link: '/api/utils/escape' },
            { text: 'Hex', link: '/api/utils/hex' },
            { text: 'JSONPath', link: '/api/utils/jsonpath' },
            { text: 'QRCode', link: '/api/utils/qrcode' },
            { text: 'URL', link: '/api/utils/url' },
            { text: 'UTF8', link: '/api/utils/utf8' },
            { text: 'UUID', link: '/api/utils/uuid' },
            { text: 'XML', link: '/api/utils/xml' },
          ],
        },
      ],
    },
  ]
}

function sdkSidebar() {
  return [
    { text: 'Overview', link: '/sdk/' },
    { text: 'Get Started', link: '/sdk/get-started' },
    {
      text: 'SDK',
      items: [
        {
          text: 'org.eclipse.dirigible.sdk.http',
          collapsed: true,
          link: '/sdk/http/',
          items: [
            { text: 'HttpClient', link: '/sdk/http/client' },
            { text: 'Decorators', link: '/sdk/http/decorators' },
            { text: 'Request', link: '/sdk/http/request' },
            { text: 'Response', link: '/sdk/http/response' },
            { text: 'Session', link: '/sdk/http/session' },
            { text: 'Upload', link: '/sdk/http/upload' },
            { text: 'HttpUtils', link: '/sdk/http/utils' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.db',
          collapsed: true,
          link: '/sdk/db/',
          items: [
            { text: 'Database', link: '/sdk/db/database' },
            { text: 'Store', link: '/sdk/db/store' },
            { text: 'Decorators', link: '/sdk/db/decorators' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.core',
          collapsed: true,
          link: '/sdk/core/',
          items: [
            { text: 'Configurations', link: '/sdk/core/configurations' },
            { text: 'Context', link: '/sdk/core/context' },
            { text: 'Env', link: '/sdk/core/env' },
            { text: 'Globals', link: '/sdk/core/globals' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.bpm',
          collapsed: true,
          link: '/sdk/bpm/',
          items: [
            { text: 'Deployer', link: '/sdk/bpm/deployer' },
            { text: 'Process', link: '/sdk/bpm/process' },
            { text: 'Tasks', link: '/sdk/bpm/tasks' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.io',
          collapsed: true,
          link: '/sdk/io/',
          items: [
            { text: 'Bytes', link: '/sdk/io/bytes' },
            { text: 'Files', link: '/sdk/io/files' },
            { text: 'Image', link: '/sdk/io/image' },
            { text: 'Streams', link: '/sdk/io/streams' },
            { text: 'Zip', link: '/sdk/io/zip' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.component',
          collapsed: true,
          link: '/sdk/component/',
          items: [
            { text: 'Decorators', link: '/sdk/component/decorators' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.cache',
          collapsed: true,
          link: '/sdk/cache/',
          items: [
            { text: 'Cache', link: '/sdk/cache/cache' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.cms',
          collapsed: true,
          link: '/sdk/cms/',
          items: [
            { text: 'Cmis', link: '/sdk/cms/cmis' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.etcd',
          collapsed: true,
          link: '/sdk/etcd/',
          items: [
            { text: 'Client', link: '/sdk/etcd/client' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.extensions',
          collapsed: true,
          link: '/sdk/extensions/',
          items: [
            { text: 'Decorators', link: '/sdk/extensions/decorators' },
            { text: 'Extensions', link: '/sdk/extensions/extensions' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.git',
          collapsed: true,
          link: '/sdk/git/',
          items: [
            { text: 'Git', link: '/sdk/git/client' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.indexing',
          collapsed: true,
          link: '/sdk/indexing/',
          items: [
            { text: 'Searcher', link: '/sdk/indexing/searcher' },
            { text: 'Writer', link: '/sdk/indexing/writer' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.integrations',
          collapsed: true,
          link: '/sdk/integrations/',
          items: [
            { text: 'Integrations', link: '/sdk/integrations/integrations' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.job',
          collapsed: true,
          link: '/sdk/job/',
          items: [
            { text: 'Decorators', link: '/sdk/job/decorators' },
            { text: 'Scheduler', link: '/sdk/job/scheduler' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.junit',
          collapsed: true,
          link: '/sdk/junit/',
          items: [
            { text: 'Assert', link: '/sdk/junit/junit' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.kafka',
          collapsed: true,
          link: '/sdk/kafka/',
          items: [
            { text: 'Consumer', link: '/sdk/kafka/consumer' },
            { text: 'Producer', link: '/sdk/kafka/producer' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.log',
          collapsed: true,
          link: '/sdk/log/',
          items: [
            { text: 'Logging', link: '/sdk/log/logging' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.mail',
          collapsed: true,
          link: '/sdk/mail/',
          items: [
            { text: 'Mail', link: '/sdk/mail/client' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.messaging',
          collapsed: true,
          link: '/sdk/messaging/',
          items: [
            { text: 'Consumer', link: '/sdk/messaging/consumer' },
            { text: 'Decorators', link: '/sdk/messaging/decorators' },
            { text: 'Producer', link: '/sdk/messaging/producer' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.mongodb',
          collapsed: true,
          link: '/sdk/mongodb/',
          items: [
            { text: 'Client', link: '/sdk/mongodb/client' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.net',
          collapsed: true,
          link: '/sdk/net/',
          items: [
            { text: 'Decorators', link: '/sdk/net/decorators' },
            { text: 'Soap', link: '/sdk/net/soap' },
            { text: 'Websockets', link: '/sdk/net/websockets' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.pdf',
          collapsed: true,
          link: '/sdk/pdf/',
          items: [
            { text: 'Pdf', link: '/sdk/pdf/pdf' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.platform',
          collapsed: true,
          link: '/sdk/platform/',
          items: [
            { text: 'Command', link: '/sdk/platform/command' },
            { text: 'Documentation', link: '/sdk/platform/documentation' },
            { text: 'Engines', link: '/sdk/platform/engines' },
            { text: 'Lifecycle', link: '/sdk/platform/lifecycle' },
            { text: 'OS', link: '/sdk/platform/os' },
            { text: 'Problems', link: '/sdk/platform/problems' },
            { text: 'Registry', link: '/sdk/platform/registry' },
            { text: 'Repository', link: '/sdk/platform/repository' },
            { text: 'Workspace', link: '/sdk/platform/workspace' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.qldb',
          collapsed: true,
          link: '/sdk/qldb/',
          items: [
            { text: 'Qldb', link: '/sdk/qldb/qldb' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.rabbitmq',
          collapsed: true,
          link: '/sdk/rabbitmq/',
          items: [
            { text: 'Consumer', link: '/sdk/rabbitmq/consumer' },
            { text: 'Producer', link: '/sdk/rabbitmq/producer' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.redis',
          collapsed: true,
          link: '/sdk/redis/',
          items: [
            { text: 'Client', link: '/sdk/redis/client' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.security',
          collapsed: true,
          link: '/sdk/security/',
          items: [
            { text: 'Decorators', link: '/sdk/security/decorators' },
            { text: 'User', link: '/sdk/security/user' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.template',
          collapsed: true,
          link: '/sdk/template/',
          items: [
            { text: 'TemplateEngines', link: '/sdk/template/engines' },
          ],
        },
        {
          text: 'org.eclipse.dirigible.sdk.utils',
          collapsed: true,
          link: '/sdk/utils/',
          items: [
            { text: 'Alphanumeric', link: '/sdk/utils/alphanumeric' },
            { text: 'Base64', link: '/sdk/utils/base64' },
            { text: 'Converter', link: '/sdk/utils/converter' },
            { text: 'Digest', link: '/sdk/utils/digest' },
            { text: 'Escape', link: '/sdk/utils/escape' },
            { text: 'Hex', link: '/sdk/utils/hex' },
            { text: 'QrCode', link: '/sdk/utils/qrcode' },
            { text: 'Url', link: '/sdk/utils/url' },
            { text: 'Utf8', link: '/sdk/utils/utf8' },
            { text: 'Uuid', link: '/sdk/utils/uuid' },
            { text: 'Xml', link: '/sdk/utils/xml' },
          ],
        },
      ],
    },
  ]
}
