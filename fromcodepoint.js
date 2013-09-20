if (!String.fromCodePoint) {
	String.fromCodePoint = function() {
		var codePoints = [];
		var floor = Math.floor;
		var highSurrogate;
		var lowSurrogate;
		var index = -1;
		var length = arguments.length;
		if (!length) {
			return '';
		}
		while (++index < length) {
			var codePoint = Number(arguments[index]);
			if (
				!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
				codePoint < 0 || // not a valid Unicode code point
				codePoint > 0x10FFFF || // not a valid Unicode code point
				floor(codePoint) != codePoint // not an integer
			) {
				throw RangeError('Invalid code point: ' + codePoint);
			}
			if (codePoint <= 0xFFFF) { // BMP code point
				codePoints.push(codePoint);
			} else { // Astral code point; split in surrogate halves
				// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				codePoint -= 0x10000;
				highSurrogate = (codePoint >> 10) + 0xD800;
				lowSurrogate = (codePoint % 0x400) + 0xDC00;
				codePoints.push(highSurrogate, lowSurrogate);
			}
		}
		return String.fromCharCode.apply(null, codePoints);
	};
}
