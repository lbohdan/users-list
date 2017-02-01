/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * Source folders
     */
    source_dir: 'app',

    /**
     * Destination folders
     */
    build_dir: 'app/dist',
    assets_dir: 'app/dist/assets',

    /**
     * App files and configs
     */
    app_files: {
        js: [
            'app/js/app.module.js',
            'app/js/app.config.js',
            'app/js/app.route.js',
            'app/js/components/**/*.js',
            'app/js/services/**/*.js',
            '!app/js/components/**/*.spec.js'
        ],
        html: 'app/js/components/**/*.html',
        less_files: [
            'app/less/**/*.less',
            'app/js/components/**/*.less'
        ]
    },

    /**
     * Config for output files
     */
    output_files: {
        app: {
            js: 'app.js',
            css: 'app.css'
        }
    }
};
