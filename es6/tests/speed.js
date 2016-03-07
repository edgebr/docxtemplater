"use strict";

var XmlTemplater = require("../xmlTemplater.js");
var expect = require("chai").expect;
var FileTypeConfig = require("../fileTypeConfig.js");
var _ = require("lodash");

describe("speed test", function () {
	it("should be fast for simple tags", function () {
		var content = "<w:t>tag {age}</w:t>";
		var time = new Date();
		for (var i = 1; i <= 100; i++) {
			new XmlTemplater(content, {fileTypeConfig: FileTypeConfig.docx, tags: {age: 12}}).render();
		}
		var duration = new Date() - time;
		expect(duration).to.be.below(100);
	});
	it("should be fast for simple tags with huge content", function () {
		var content = "<w:t>tag {age}</w:t>";
		var prepost = ((() => {
			var result = [];
			for (var i = 1; i <= 10000; i++) {
				result.push("bla");
			}
			return result;
		})()).join("");
		content = prepost + content + prepost;
		var time = new Date();
		for (var i = 1; i <= 50; i++) {
			new XmlTemplater(content, {fileTypeConfig: FileTypeConfig.docx, tags: {age: 12}}).render();
		}
		var duration = new Date() - time;
		expect(duration).to.be.below(50);
	});
	it("should be fast for loop tags", function () {
		var content = "<w:t>{#users}{name}{/users}</w:t>";
		var users = _.times(1000, function () {
			return {name: "foo"};
		});
		var time = new Date();
		for (var i = 1; i <= 1; i++) {
			new XmlTemplater(content, {experimentalCompiledLoops: true, fileTypeConfig: FileTypeConfig.docx, tags: {users: users}}).render();
		}
		var duration = new Date() - time;
		expect(duration).to.be.below(50);
	});
});
