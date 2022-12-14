const git = require('git-rev-sync');
module.exports = function (grunt) {
	const git        = require('git-rev-sync'),
	      thisTag    = git.tag(),
	      thisBranch = git.branch();

	grunt.initConfig({
		                 pkg    : grunt.file.readJSON('package.json'),
		                 banner : '/*\n' +
		                          '* <%= pkg.title %>\n' +
		                          '*\n' +
		                          '* <%= pkg.description %>\n' +
		                          '*\n' +
		                          '* Author: <%= pkg.author %>\n' +
		                          '* Copyright (c) <%= grunt.template.today("yyyy") %> PMG: The Engage Group\n' +
		                          '* License: <%= pkg.license %>\n' +
		                          '*\n' +
		                          '* Release:\n' +
		                          '*   Branch: ' + thisBranch + '\n' +
		                          '*   Tag:    ' + thisTag + '\n' +
		                          '*   Date:   ' + grunt.template.today('yyyymmdd') + '\n' +
		                          '*/\n',
		                 postFix: `_${thisTag}`,
		                 postFixEN: `_${thisTag}`.replace(/\./g, '_'),
		                 uglify : {
			                 options: {
				                 banner   : '<%= banner %>',
				                 sourceMap: 'dist/<%= pkg.name %>.min.js.map'
			                 },
			                 build  : {
				                 src : 'src/<%= pkg.name %>.js',
				                 dest: 'dist/<%= pkg.name %>.min.js'
			                 },
		                 },
		                 cssmin : {
			                 build: {
				                 src : 'src/<%= pkg.name %>.css',
				                 dest: 'dist/<%= pkg.name %>.min.css'
			                 }
		                 },
		                 copy   : {
			                 dist: {
				                 files: [
					                 {
						                 src : 'dist/<%= pkg.name %>.min.js',
						                 dest: 'dist/<%= pkg.name %><%= postFix %>.min.js',
					                 },
					                 {
						                 src : 'dist/<%= pkg.name %>.min.js',
						                 dest: 'dist/<%= pkg.name %><%= postFixEN %>_min.js',
					                 },
					                 {
						                 src : 'src/<%= pkg.name %>.js',
						                 dest: 'dist/<%= pkg.name %><%= postFix %>.js',
					                 },
					                 {
						                 src : 'dist/<%= pkg.name %>.min.js.map',
						                 dest: 'dist/<%= pkg.name %><%= postFix %>.min.js.map',
					                 },
					                 {
						                 src : 'dist/<%= pkg.name %>.min.css',
						                 dest: 'dist/<%= pkg.name %><%= postFix %>.min.css',
					                 },
					                 {
						                 src : 'dist/<%= pkg.name %>.min.css',
						                 dest: 'dist/<%= pkg.name %><%= postFixEN %>_min.css',
					                 }
				                 ]

			                 }
		                 }
	                 });

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default task(s).
	grunt.registerTask('default', ['uglify', 'cssmin', 'copy']);

};
