var csscritic;

(function () {
    "use strict";

    var packageVersion = csscriticLib.packageVersion || 'dev',
        util = csscriticLib.util(),
        browserRenderer = csscriticLib.browserRenderer(util, csscriticLib.jobQueue, rasterizeHTML),
        domStorage = csscriticLib.domstorage(util, localStorage),
        indexedDbStorage = csscriticLib.indexeddbstorage(util),
        migrateToIndexedDbStorage = csscriticLib.migratetoindexeddbstorage(domStorage, indexedDbStorage),
        reporting = csscriticLib.reporting(browserRenderer, migrateToIndexedDbStorage, util),
        regression = csscriticLib.regression(browserRenderer, util, imagediff);

    csscritic = csscriticLib.main(
        regression,
        reporting,
        util,
        migrateToIndexedDbStorage);

    // Export convenience constructors
    var basicHTMLReporterUtil = csscriticLib.basicHTMLReporterUtil(),
        basicHTMLReporter = csscriticLib.basicHTMLReporter(util, basicHTMLReporterUtil, window.document);

    csscritic.BasicHTMLReporter = basicHTMLReporter.BasicHTMLReporter;

    var niceReporter = csscriticLib.niceReporter(util, {}, packageVersion);

    csscritic.NiceReporter = niceReporter.NiceReporter;
}());
