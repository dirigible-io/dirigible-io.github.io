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
          { text: 'Manifesto', link: '/manifesto/' },
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
    { text: 'Welcome', link: '/help/' },
    {
      text: 'Get Started',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/help/get-started/' },
        {
          text: 'Installation',
          collapsed: true,
          items: [
            { text: 'Docker', link: '/help/get-started/installation/docker' },
            { text: 'Standalone JAR', link: '/help/get-started/installation/jar' },
            { text: 'Kubernetes', link: '/help/get-started/installation/kubernetes' },
            { text: 'Trial', link: '/help/get-started/installation/trial' },
          ],
        },
        { text: 'Your first application', link: '/help/get-started/first-application' },
        { text: 'Tour the IDE', link: '/help/get-started/ide-tour' },
        { text: 'Next steps', link: '/help/get-started/next-steps' },
      ],
    },
    {
      text: 'Concepts',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/help/concepts/' },
        { text: 'Platform overview', link: '/help/concepts/platform-overview' },
        { text: 'Polyglot runtime', link: '/help/concepts/polyglot-runtime' },
        { text: 'Repository and workspace', link: '/help/concepts/repository-and-workspace' },
        { text: 'Projects and artefacts', link: '/help/concepts/projects-and-artefacts' },
        { text: 'The synchronizer model', link: '/help/concepts/synchronizer-model' },
        { text: 'Publish and reconcile', link: '/help/concepts/publish-and-reconcile' },
        { text: 'Multi-tenancy', link: '/help/concepts/multi-tenancy' },
        { text: 'Security model', link: '/help/concepts/security-model' },
        { text: 'Lifecycle and hot-reload', link: '/help/concepts/lifecycle-and-hot-reload' },
        { text: 'Extensibility', link: '/help/concepts/extensibility' },
      ],
    },
    {
      text: 'Intent',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/help/intent/' },
        { text: 'The .intent file', link: '/help/intent/intent-file' },
        { text: 'The Intent Editor', link: '/help/intent/editor' },
        { text: 'The AI assistant', link: '/help/intent/ai-assistant' },
        { text: 'Generators and generation', link: '/help/intent/generators' },
        { text: 'Declarative glue', link: '/help/intent/glue' },
      ],
    },
    {
      text: 'IDE',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/help/ide/' },
        { text: 'Shell and branding', link: '/help/ide/shell-and-branding' },
        {
          text: 'Perspectives',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/ide/perspectives/' },
            { text: 'Workbench', link: '/help/ide/perspectives/workbench' },
            { text: 'Database', link: '/help/ide/perspectives/database' },
            { text: 'Git', link: '/help/ide/perspectives/git' },
            { text: 'Documents', link: '/help/ide/perspectives/documents' },
            { text: 'Jobs', link: '/help/ide/perspectives/jobs' },
            { text: 'Operations', link: '/help/ide/perspectives/operations' },
            { text: 'Processes', link: '/help/ide/perspectives/processes' },
            { text: 'Messaging', link: '/help/ide/perspectives/messaging' },
            { text: 'Monitoring', link: '/help/ide/perspectives/monitoring' },
            { text: 'Tracing', link: '/help/ide/perspectives/tracing' },
            { text: 'Security', link: '/help/ide/perspectives/security' },
            { text: 'Settings', link: '/help/ide/perspectives/settings' },
          ],
        },
        {
          text: 'Editors',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/ide/editors/' },
            { text: 'Monaco', link: '/help/ide/editors/monaco' },
            { text: 'CSV and CSVIM', link: '/help/ide/editors/csv-and-csvim' },
            { text: 'Access and roles', link: '/help/ide/editors/access-and-roles' },
            { text: 'Jobs', link: '/help/ide/editors/jobs' },
            { text: 'Listeners', link: '/help/ide/editors/listeners' },
            { text: 'Extensions', link: '/help/ide/editors/extensions' },
            { text: 'Websockets', link: '/help/ide/editors/websockets' },
            { text: 'Form builder', link: '/help/ide/editors/form-builder' },
            { text: 'Image', link: '/help/ide/editors/image' },
            { text: 'Mapping', link: '/help/ide/editors/mapping' },
            { text: 'Report', link: '/help/ide/editors/report' },
          ],
        },
        {
          text: 'Modelers',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/ide/modelers/' },
            { text: 'Entity Data', link: '/help/ide/modelers/entity-data' },
            { text: 'Database Schema', link: '/help/ide/modelers/database-schema' },
            { text: 'BPMN', link: '/help/ide/modelers/bpmn' },
            { text: 'Form Designer', link: '/help/ide/modelers/form-designer' },
            { text: 'Integrations (Karavan)', link: '/help/ide/modelers/integrations-karavan' },
          ],
        },
        {
          text: 'Views',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/ide/views/' },
            { text: 'Projects', link: '/help/ide/views/projects' },
            { text: 'Console', link: '/help/ide/views/console' },
            { text: 'Terminal', link: '/help/ide/views/terminal' },
            { text: 'Search', link: '/help/ide/views/search' },
            { text: 'Problems', link: '/help/ide/views/problems' },
            { text: 'Logs', link: '/help/ide/views/logs' },
            { text: 'JavaScript debugger', link: '/help/ide/views/debugger-js' },
            { text: 'Java debugger', link: '/help/ide/views/debugger-java' },
            { text: 'Metrics', link: '/help/ide/views/monitoring-metrics' },
            { text: 'JVM monitoring', link: '/help/ide/views/jvm-monitoring' },
            { text: 'JVM threads', link: '/help/ide/views/jvm-threads' },
            { text: 'Jobs', link: '/help/ide/views/jobs' },
            { text: 'Listeners', link: '/help/ide/views/listeners' },
            { text: 'Extensions', link: '/help/ide/views/extensions' },
            { text: 'Websockets', link: '/help/ide/views/websockets' },
            { text: 'Registry', link: '/help/ide/views/registry' },
            { text: 'Repository', link: '/help/ide/views/repository' },
            { text: 'Transfer', link: '/help/ide/views/transfer' },
            { text: 'Swagger', link: '/help/ide/views/swagger' },
            { text: 'Preview', link: '/help/ide/views/preview' },
            { text: 'Properties', link: '/help/ide/views/properties' },
            { text: 'Welcome', link: '/help/ide/views/welcome' },
          ],
        },
        { text: 'Menus', link: '/help/ide/menus' },
        { text: 'Keyboard shortcuts', link: '/help/ide/keyboard-shortcuts' },
        { text: 'Themes', link: '/help/ide/themes' },
      ],
    },
    {
      text: 'Develop',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/help/develop/' },
        {
          text: 'Languages',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/develop/languages/' },
            { text: 'JavaScript', link: '/help/develop/languages/javascript' },
            { text: 'TypeScript', link: '/help/develop/languages/typescript' },
            { text: 'Java', link: '/help/develop/languages/java' },
            { text: 'Python', link: '/help/develop/languages/python' },
          ],
        },
        { text: 'The decorator / annotation model', link: '/help/develop/decorators-model' },
        { text: 'REST APIs', link: '/help/develop/rest-apis' },
        { text: 'Entities and persistence', link: '/help/develop/entities-and-persistence' },
        { text: 'Dependency injection', link: '/help/develop/dependency-injection' },
        { text: 'Scheduled jobs', link: '/help/develop/scheduled-jobs' },
        { text: 'Message listeners', link: '/help/develop/message-listeners' },
        { text: 'Extension providers', link: '/help/develop/extension-providers' },
        { text: 'Websockets', link: '/help/develop/websockets' },
        { text: 'Security and roles', link: '/help/develop/security-and-roles' },
        { text: 'Working with data', link: '/help/develop/working-with-data' },
        { text: 'Working with files and CMS', link: '/help/develop/working-with-files-and-cms' },
        { text: 'Working with Git', link: '/help/develop/working-with-git' },
        { text: 'Generation from models', link: '/help/develop/using-templates-for-generation' },
        { text: 'Harmonia runtime UI', link: '/help/develop/harmonia-runtime-ui' },
        { text: 'Debugging JavaScript', link: '/help/develop/debugging-javascript' },
        { text: 'Debugging Java', link: '/help/develop/debugging-java' },
        { text: 'Testing', link: '/help/develop/testing' },
      ],
    },
    {
      text: 'Artefacts',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/help/artefacts/' },
        {
          text: 'Scripting',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/artefacts/scripting/' },
            { text: 'JavaScript', link: '/help/artefacts/scripting/javascript' },
            { text: 'TypeScript', link: '/help/artefacts/scripting/typescript' },
            { text: 'Java', link: '/help/artefacts/scripting/java' },
            { text: 'Python', link: '/help/artefacts/scripting/python' },
          ],
        },
        {
          text: 'Data',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/artefacts/data/' },
            { text: 'Data source', link: '/help/artefacts/data/datasource' },
            { text: 'Schema', link: '/help/artefacts/data/schema' },
            { text: 'Table', link: '/help/artefacts/data/table' },
            { text: 'View', link: '/help/artefacts/data/view' },
            { text: 'CSV import model', link: '/help/artefacts/data/csvim' },
          ],
        },
        {
          text: 'Process',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/artefacts/process/' },
            { text: 'BPMN', link: '/help/artefacts/process/bpmn' },
            { text: 'Scheduled job', link: '/help/artefacts/process/job' },
            { text: 'Camel route', link: '/help/artefacts/process/camel' },
            { text: 'Message listener', link: '/help/artefacts/process/listener' },
            { text: 'WebSocket', link: '/help/artefacts/process/websocket' },
          ],
        },
        {
          text: 'Services',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/artefacts/services/' },
            { text: 'OData', link: '/help/artefacts/services/odata' },
            { text: 'HTTP proxy', link: '/help/artefacts/services/proxy' },
            { text: 'Native app', link: '/help/artefacts/services/nativeapp' },
            { text: 'Expose', link: '/help/artefacts/services/expose' },
          ],
        },
        {
          text: 'Security',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/artefacts/security/' },
            { text: 'Access', link: '/help/artefacts/security/access' },
            { text: 'Roles', link: '/help/artefacts/security/roles' },
            { text: 'Client registration', link: '/help/artefacts/security/client-registration' },
          ],
        },
        {
          text: 'Extensibility',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/artefacts/extensibility/' },
            { text: 'Extension point', link: '/help/artefacts/extensibility/extensionpoint' },
            { text: 'Extension', link: '/help/artefacts/extensibility/extension' },
            { text: 'Component', link: '/help/artefacts/extensibility/component' },
          ],
        },
        {
          text: 'Docs',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/artefacts/docs/' },
            { text: 'Markdown', link: '/help/artefacts/docs/markdown' },
            { text: 'Confluence', link: '/help/artefacts/docs/confluence' },
          ],
        },
      ],
    },
    {
      text: 'Tutorials',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/help/tutorials/' },
        { text: 'Bookstore', link: '/help/tutorials/bookstore/' },
        { text: 'Scheduled job', link: '/help/tutorials/scheduled-job/' },
        { text: 'File upload', link: '/help/tutorials/file-upload' },
        { text: 'Shell command', link: '/help/tutorials/shell-command' },
        { text: 'Listener on a queue', link: '/help/tutorials/listener-of-a-queue' },
        { text: 'Kafka producer and consumer', link: '/help/tutorials/kafka-producer-consumer' },
        { text: 'BPMN process', link: '/help/tutorials/bpmn-process' },
        { text: 'Generate from model', link: '/help/tutorials/generate-from-model' },
        { text: 'Generate from data source', link: '/help/tutorials/generate-from-datasource' },
        { text: 'REST with TypeScript decorators', link: '/help/tutorials/rest-with-typescript-decorators' },
        { text: 'REST with Java controllers', link: '/help/tutorials/rest-with-java-controllers' },
        { text: 'Native app integration', link: '/help/tutorials/native-app-integration' },
        { text: 'Create a view', link: '/help/tutorials/ide-create-view' },
        { text: 'Create a perspective', link: '/help/tutorials/ide-create-perspective' },
        { text: 'Custom stack', link: '/help/tutorials/custom-stack/' },
      ],
    },
    {
      text: 'Setup',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/help/setup/' },
        { text: 'Docker', link: '/help/setup/docker' },
        { text: 'Standalone JAR (Tomcat)', link: '/help/setup/tomcat' },
        {
          text: 'Kubernetes',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/setup/kubernetes/' },
            { text: 'Helm', link: '/help/setup/kubernetes/helm' },
            { text: 'Google Kubernetes Engine', link: '/help/setup/kubernetes/gke' },
            { text: 'Azure Kubernetes Service', link: '/help/setup/kubernetes/aks' },
            { text: 'Red Hat OpenShift', link: '/help/setup/kubernetes/openshift' },
            { text: 'SAP BTP Kyma', link: '/help/setup/kubernetes/kyma' },
            {
              text: 'Addons',
              collapsed: true,
              items: [
                { text: 'Keycloak', link: '/help/setup/kubernetes/addons/keycloak' },
                { text: 'PostgreSQL', link: '/help/setup/kubernetes/addons/postgres' },
                { text: 'GCP DNS Zone', link: '/help/setup/kubernetes/addons/google-dns-zone' },
                { text: 'GKE cluster', link: '/help/setup/kubernetes/addons/gke-cluster' },
                { text: 'Azure DNS Zone', link: '/help/setup/kubernetes/addons/azure-dns-zone' },
                { text: "Let's Encrypt", link: '/help/setup/kubernetes/addons/letsencrypt' },
                { text: 'Istio', link: '/help/setup/kubernetes/addons/istio' },
              ],
            },
          ],
        },
        { text: 'Cloud Foundry', link: '/help/setup/cloud-foundry' },
        { text: 'GraalVM native image', link: '/help/setup/native-image' },
        {
          text: 'Databases',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/setup/databases/' },
            { text: 'H2', link: '/help/setup/databases/h2' },
            { text: 'PostgreSQL', link: '/help/setup/databases/postgres' },
            { text: 'Microsoft SQL Server', link: '/help/setup/databases/mssql' },
            { text: 'MariaDB', link: '/help/setup/databases/mariadb' },
            { text: 'MySQL', link: '/help/setup/databases/mysql' },
            { text: 'SAP HANA', link: '/help/setup/databases/hana' },
            { text: 'Snowflake', link: '/help/setup/databases/snowflake' },
            { text: 'MongoDB', link: '/help/setup/databases/mongodb' },
          ],
        },
        {
          text: 'Authentication',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/help/setup/authentication/' },
            { text: 'Basic', link: '/help/setup/authentication/basic' },
            { text: 'GitHub OAuth', link: '/help/setup/authentication/github-oauth' },
            { text: 'Keycloak', link: '/help/setup/authentication/keycloak' },
            { text: 'Cognito', link: '/help/setup/authentication/cognito' },
            { text: 'Snowflake', link: '/help/setup/authentication/snowflake' },
          ],
        },
        { text: 'Multi-tenancy', link: '/help/setup/multi-tenancy' },
        { text: 'Environment variables', link: '/help/setup/environment-variables' },
      ],
    },
    {
      text: 'Operate',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/help/operate/' },
        { text: 'Observability', link: '/help/operate/observability' },
        { text: 'OpenTelemetry', link: '/help/operate/opentelemetry' },
        { text: 'Logging', link: '/help/operate/logging' },
        { text: 'Health checks', link: '/help/operate/health-checks' },
        { text: 'Tenant management', link: '/help/operate/tenants' },
        { text: 'Data transfer', link: '/help/operate/data-transfer' },
        { text: 'Data anonymisation', link: '/help/operate/data-anonymization' },
        { text: 'Backups and export', link: '/help/operate/backups-and-export' },
        { text: 'Secrets and encryption', link: '/help/operate/secrets-and-encryption' },
        { text: 'Troubleshooting', link: '/help/operate/troubleshooting' },
      ],
    },
    {
      text: 'Extend',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/help/extend/' },
        { text: 'Custom perspective', link: '/help/extend/custom-perspective' },
        { text: 'Custom view', link: '/help/extend/custom-view' },
        { text: 'Custom editor', link: '/help/extend/custom-editor' },
        { text: 'Custom menu', link: '/help/extend/custom-menu' },
        { text: 'Extension points (deep dive)', link: '/help/extend/extension-points-deep-dive' },
        { text: 'Custom synchronizer', link: '/help/extend/custom-synchronizer' },
        { text: 'Custom engine', link: '/help/extend/custom-engine' },
        { text: 'Custom API module', link: '/help/extend/custom-api-module' },
        { text: 'Custom database dialect', link: '/help/extend/custom-database-dialect' },
        { text: 'Custom CMS provider', link: '/help/extend/custom-cms-provider' },
        { text: 'Custom authentication', link: '/help/extend/custom-authentication' },
        { text: 'BlimpKit UI primer', link: '/help/extend/blimpkit-ui' },
        { text: 'Themes', link: '/help/extend/themes' },
      ],
    },
    {
      text: 'Reference',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/help/reference/' },
        { text: 'SDK references', link: '/help/reference/sdks-pointer' },
        { text: 'HTTP endpoints', link: '/help/reference/http-endpoints' },
        { text: 'URL patterns', link: '/help/reference/url-patterns' },
        { text: 'Ports', link: '/help/reference/ports' },
        { text: 'Environment variables', link: '/help/reference/environment-variables' },
        { text: 'Artefact extensions', link: '/help/reference/artefact-extensions' },
        { text: 'Roles and permissions', link: '/help/reference/roles-and-permissions' },
        { text: 'Compatibility', link: '/help/reference/compatibility' },
        { text: 'Glossary', link: '/help/reference/glossary' },
        { text: 'FAQ', link: '/help/reference/faq' },
      ],
    },
    {
      text: 'Contributing',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/help/contributing/' },
        { text: 'Building from source', link: '/help/contributing/building-from-source' },
        { text: 'Code style', link: '/help/contributing/code-style' },
        { text: 'Testing', link: '/help/contributing/testing' },
        { text: 'Documentation', link: '/help/contributing/documentation' },
        { text: 'Community', link: '/help/contributing/community' },
        { text: 'Credits', link: '/help/contributing/credits' },
        { text: 'License', link: '/help/contributing/license' },
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
