/**
 * @target ë¬¸ìì´ ì²ë¦¬ ê´ë ¨ ê³µíµ í¨ì
 */

/**
 * @type strLib
 */
var strLib = {};

/**
 * Null ë° ê³µëì´ë©´ True ìëë©´ False ë°ííë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> str_val ë¬¸ìì´
 * @return true/false
 */


strLib.allCustomFormatter = function(maskingValue) {
	maskingValue = maskingValue.replace(/(?<=.{0})./gi, "*");
	return maskingValue;
};


strLib.isEmpty = function(str_val) {

    str_val = strLib.trim(str_val);
    if (str_val == null || str_val.length == 0)
        return true;
    else
        return false;
};
/**
 * ìë ¥ë°ì str ì ì¼ìª½ì numë§í¼ chrë¡ ì±ì´ë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> str ìë³¸ ë¬¸ìì´
 * @param <Number> num ì±ì¸ ìë¦¬ì
 * @param <String> chr ì±ì¸ ë¬¸ì
 * @example strLib.lpad("1", 3, "0")
 * @return
 */
strLib.lpad = function(str, num, chr) {
    if (!str || !chr || str.length >= num) {
        return str;
    }

    var max = num - str.length;
    for ( var i = 0; i < max; i++) {
        str = chr + str;
    }

    return str;
};

/**
 * ë¬¸ìì´ ì¤ê° ìë¼ì ë°ííë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> source ìë³¸ ë¬¸ìì´
 * @param <Number> start ìë¥¼ ë¬¸ìì´ ìì ìì¹
 * @param <Number> length ìë¥¼ ë¬¸ìì´ ê¸¸ì´
 * @return <String> ìë¼ë¸ ë¬¸ìì´
 */
strLib.mid = function(source, start, length) {
    if (start < 0 || length < 0)
        return "";

    var endLength = -1;
    var sourceLength = source.toString().length;
    if (start + length > sourceLength)
        endLength = sourceLength;
    else
        endLength = start + length;
    return source.toString().substring(start, endLength);
};

/**
 * ë¬¸ìì´ì ì ë¤ ê³µë°±ì ì ê±°íë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> ë¬¸ìì´
 * @return <String>
 */
strLib.trim = function(str) {
    return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
};

/**
 * ë¬¸ìì´ì ì ê³µë°±ì ì ê±°íë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> ë¬¸ìì´
 * @return <String>
 */
strLib.ltrim = function(str) {
    return str.replace(/^\s+/, "");
};

/**
 * ë¬¸ìì´ì ë¤ ê³µë°±ì ì ê±°íë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> ë¬¸ìì´
 * @return <String>
 */
strLib.rtrim = function(str) {
    return str.replace(/\s+$/, "");
};

/**
 * locIndex ë¤ì ë¬¸ìì´ì í¹ì  ë¬¸ìë¡ ë§ì¤í¹ ì²ë¦¬íë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> value ìë³¸ ë¬¸ìì´
 * @param <Number> locIndex locIndex ë¤ì ë¬¸ìì´ì ë§ì¤í¹ ì²ë¦¬
 * @param <String> maskingChar ë§ì¤í¹ ë¬¸ì (*)
 * @return <String> ë§ì¤í¹ ì²ë¦¬ë ë¬¸ìì´
 * @example strLib.maskRStr("082-123456-02-123", 6, "*");
 */
strLib.maskRStr = function(value, locIndex, maskingChar) {
    var retValue = "";
    var idx = 0;
    for ( var i = 0; i < value.length; i++) {
        var oneChar = value.charAt(i);
        if (oneChar == "-") {
            retValue += oneChar;
        } else {
            idx++;
            retValue = (idx > locIndex) ? retValue + maskingChar : retValue + oneChar;
        }
    }
    return retValue;
};

/**
 * ì°í¸ë²í¸ì "-"ê° ìë ê²½ì° "-"ë¥¼ ì¶ê°íì¬ íìíë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> value ì°í¸ë²í¸
 * @return <String> Masked ë¬¸ìì´
 * @example strLib.maskPostFormat("123456"); // 123-456
 */
strLib.maskPostFormat = function(value) {

    if (typeof value == "number") {
        value = value + "";
    }
    var pos = -1;

    // 1. test pos value
    pos = value.indexOf("-");
    if (pos > -1 && (pos != 3 || value.length <= 4)) {
        value = value.slice(0, pos) + value.slice(pos + 1, value.length);
    }
    // 2. add "-"
    pos = value.indexOf("-");
    if (pos == -1 && value.length >= 4) {
        value = value.slice(0, 3) + "-" + value.slice(3, value.length);
    }
    // 3. check max length
    if (value.length > 7) {
        value = value.slice(0, 7);
    }
    return value;
};

/**
 * ì£¼ë¯¼ë±ë¡ë²í¸ì "-"ê° ìë ê²½ì° "-"ë¥¼ ì¶ê°íë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> value ì£¼ë¯¼ë±ë¡ë²í¸
 * @return <String> Masked ë¬¸ìì´
 * @example strLib.maskSSNFormat("9901012123456");  // 990101-2123456
 */
strLib.maskSSNFormat = function(value) {

    if (typeof value == "number") {
        value = value + "";
    }
    var pos = -1;

    // 1. test pos value
    pos = value.indexOf("-");
    if (pos > -1 && (pos != 6 || value.length <= 7)) {
        value = value.slice(0, pos) + value.slice(pos + 1, value.length);
    }
    // 2. add "-"
    pos = value.indexOf("-");
    if (pos == -1 && value.length >= 7) {
        value = value.slice(0, 6) + "-" + value.slice(6, value.length);
    }
    // 3. check max length
    if (value.length > 14) {
        value = value.slice(0, 14);
    }
    return value;
};

/**
 * ì£¼ë¯¼ë±ë¡ë²í¸ì "-"ê° ìë ê²½ì° "-"ë¥¼ ì¶ê°íë©° ë¤ì 6ìë¦¬ë¥¼ *ë¡ ì²ë¦¬íë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> value ì£¼ë¯¼ë±ë¡ë²í¸
 * @return <String> Masked ë¬¸ìì´
 * @example strLib.maskSSNFormat2("9901012123456");  // 990101-2******
 */
strLib.maskSSNFormat2 = function(value) {

    if (typeof value == "number") {
        value = value + "";
    }
    if (value.indexOf("-") >= 0) {
        var pos = value.indexOf("-");
        retValue = value.substring(0, pos) + value.substring(pos + 1);
    } else {
        retValue = value;
    }
    if (retValue.length > 7) {
        retValue = retValue.substring(0, 6) + "-" + retValue.substring(6, 7) + "*******".substring(0, retValue.length - 7);
    } else if (retValue.length > 6) {
        retValue = retValue.substring(0, 6) + "-" + retValue.substring(6);
    }
    return retValue;
};

/**
 * ì¬ììë²í¸ì í¬ë§· ì í¨ì±ì ê²ì¬íë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> value ì¬ììë²í¸
 * @return <Boolean> 
 * @example strLib.checkCorpFormat("1234567890"); 
 */
strLib.checkCorpFormat = function(value) {

    var sum = 0;
    var aBizID = new Array(10);
    var checkID = new Array("1", "3", "7", "1", "3", "7", "1", "3", "5");

    for ( var i = 0; i < 10; i++) {
        aBizID[i] = str.substring(i, i + 1);
    }
    for ( var i = 0; i < 9; i++) {
        sum += aBizID[i] * checkID[i];
    }
    sum = sum + parseInt((aBizID[8] * 5) / 10);
    temp = sum % 10;
    temp1 = 0;

    if (temp != 0) {
        temp1 = 10 - temp;
    } else {
        temp1 = 0;
    }
    if (temp1 != aBizID[9]) {
        return false;
    }
    return true;
};

/**
 * ì£¼ë¯¼ë²í¸, ì¬ììë²í¸ ì²´í¬íì¬ í¬ë§·ì ë§ê² "-" ì¶ê°íë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> value ì£¼ë¯¼ë²í¸ ëë ì¬ììë²í¸
 * @return <String> Masked ë¬¸ìì´
 * @example strLib.maskSSNCorpFormat("1234567890"); // 123-45-67890(ì¬ììë²í¸), 123456-1234567(ì£¼ë¯¼ë±ë¡ë²í¸)
 */
strLib.maskSSNCorpFormat = function(value) {

    if (typeof value == "number") {
        value = value + "";
    }

    // 1. test pos value
    var pos = value.indexOf("-");
    var lastPos = value.lastIndexOf("-");
    if (lastPos == 6 && value.length <= 7) {
        value = value.slice(0, lastPos) + value.slice(lastPos + 1, value.length);
    }
    if (lastPos == 3 && value.length <= 4) {
        value = value.slice(0, lastPos) + value.slice(lastPos + 1, value.length);
    }
    // 2. add "-"
    pos = value.indexOf("-");
    if (pos == -1 && value.length >= 4) {
        value = value.slice(0, 3) + "-" + value.slice(3, value.length);
    }
    pos = value.indexOf("-");
    var lastPos = value.lastIndexOf("-");
    if (pos == 3 && value.length >= 7 && lastPos == pos) {
        value = value.slice(0, 6) + "-" + value.slice(6, value.length);
    }

    var sregExp = /-/g;

    // 3. check max length
    if (value.length > 12) {
        value = value.replace(sregExp, "");
        value = value.slice(0, 6) + "-" + value.slice(6, value.length);
    }
    if (value.length > 14) {
        value = value.slice(0, 14);
    }
    return value;
};

/**
 * ì íë²í¸ì "-"ê° ìë ê²½ì° "-"ë¥¼ ì¶ê°íì¬ íìíë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> value ì íë²í¸
 * @return <String> Masked ë¬¸ìì´
 * @example strLib.maskTelFormat("0226631234");  // 02-2663-1234
 */
strLib.maskTelFormat = function(value) {

    if (typeof value == "number") {
        value = value + "";
    }

    var delimeter1 = "-";
    var delimeter2 = "-";

    var firstDelimeterPos = 3;
    var maxLength = 11 + delimeter1.length + delimeter2.length;

    if (value.indexOf("02") == 0) {
        firstDelimeterPos -= 1;
        maxLength -= 1;
    }

    // limit max length
    if (value.length > maxLength) {
        value = value.substr(0, maxLength);
    }

    // remove delimeter
    var regExp = new RegExp("[0-9]*", 'g');
    var result = (value + "").match(regExp);
    value = result.join("");

    // 1st delimeter
    if (value.length > firstDelimeterPos) {
        value = value.substr(0, firstDelimeterPos) + delimeter1 + value.substr(firstDelimeterPos, value.length);
    }
    // 2nd delimeter
    if (value.length > firstDelimeterPos + delimeter1.length + 4) {
        value = value.substr(0, value.length - 4) + delimeter2 + value.substr(value.length - 4, value.length);
    }
    return value;
};

/**
 * ë¬¸ìì´ì Byteë¥¼ ê³ì°íë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> content íì¤í¸
 * @param <Object> outObj ì´ Byteê° íìë  Object (ìëµê°ë¥)
 * @example 
 * strLib.getByteLength(obj.getValue()); 
 * strLib.getByteLength(obj.getValue(), obj1);
 */
strLib.getByteLength = function(ontent, outObj) {
    var tmpStr;
    var temp = 0;
    var onechar;
    var tcount = 0;
    var obj = outObj;
    tmpStr = new String(content);
    temp = tmpStr.toString().length;
    for ( var k = 0; k < temp; k++) {
        onechar = tmpStr.toString().charAt(k);
        if (escape(onechar) == '%0D') {
        } else if (escape(onechar).length > 4) {
            tcount += 2;
        } else {
            tcount++;
        }
    }
    if (typeof outObj != 'undefined' && outObj != null) {
        obj.setValue(tcount);
    }
    return tcount;
};

/**
 * ì¤í¸ë§ì replace ììì ì²ë¦¬íë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> str ìë¬¸
 * @param <String> orgStr ê²ìí  ë¬¸ì
 * @param <String> repStr ì¹íí  ë¬¸ì
 * @return <String> ì¹íë ë¬¸ìì´
 * @example strLib.replaceAll(obj.getValue(), "/", "");
 */
strLib.replaceAll = function(str, orgStr, repStr) {
    return str.split(orgStr).join(repStr);
};

/**
 * ì¤í¸ë§ì SCRIPT replace ììì ì²ë¦¬íë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> str ìë¬¸
 * @return <String> ì¹íë ë¬¸ìì´
 * @example strLib.replaceAll(obj.getValue(), "/", "");
 */
strLib.scriptReplaceAll = function(str) {
    str.split("<").join("&lt;");
    return str.split(">").join("&gt;");
};


/**
 * ë¬¸ìì´ ìë¨ì´ ì¬ë¶ ì²´í¬
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param word : ë¬¸ìì´
 * @return ìë¨ì´ì´ë©´ true, ìëë©´ false
 * @description ìë ¥ë°ì ë¬¸ìì´ì´ ëª¨ë ìë¨ì´ì´ë©´ true, ìëë©´ falseë¥¼ ë¦¬í´íë¤
 * @example strLib.isEnglish("abcdefg");
 */
strLib.isEnglish = function(word) {

    var c;
    if (strLib.trim(word).length == 0) {
        return false;
    }

    for ( var i = 0; i < word.length; i++) {
        c = word.toLowerCase().charAt(i);
        if (c < 'a' || c > 'z') {
            if ((c == " ") || (c == ".") || (c == "-")) {
                continue;
            }

            return false;
        }
    }
    return true;
};

/**
 * ìë ¥ë°ì ë¬¸ìì´ì´ ëª¨ë ìë¬¸ ëë ì«ìë¡ ëì´ ìì¼ë©´ true, ìëë©´ falseë¥¼ ë¦¬í´íë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param word : ë¬¸ìì´
 * @return ìë¬¸orì«ìì´ë©´ true, ìëë©´ false
 * @example strLib.hasNumOrLetter("abc123de4fg");
 */
strLib.hasNumOrLetter = function(word) {

    var c;
    for ( var i = 0; i < word.length; i++) {
        c = word.toLowerCase().charAt(i);

        if ((c < 'a' || c > 'z') && (c < '0' || c > '9')) {
            return false;
        }

    }
    return true;
};

/**
 * ìë ¥ë°ì ë¬¸ìì´ì íê¸ì´ í¬í¨ëì´ ìì¼ë©´ true, ìëë©´ falseë¥¼ ë¦¬í´íë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param word : ë¬¸ìì´
 * @return íê¸ì´ë©´ true, ìëë©´ false
 * @example strLib.isKoreanWord("abcdë¬´ê¶í");
 */
strLib.isKoreanWord = function(word) {

    var c;
    for ( var i = 0; i < word.length; i++) {
        c = word.charAt(i);
        if (strLib.isKorean(c)) {
            return true;
        }
    }
    return false;
};

/**
 * ìë ¥ë°ì ë¬¸ìì´ì´ íê¸ì´ë©´ true, ìëë©´ falseë¥¼ ë¦¬í´íë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib 
 * @param str : ë¬¸ìì´
 * @return íê¸ì´ í¬í¨ëì´ ìì¼ë©´ true, ìëë©´ false
 * @example strLib.isKorean("ë¬´ê¶íê½ì´");
 */
strLib.isKorean = function(str) {

    if (str != null && str.length > 0) {
        var locale = 0;
        for ( var i = 0; i < str.length; i++) {
            locale = strLib.getLocale(str.charAt(i));
        }
        if ((locale & ~0x3) == 0) {
            return true;
        }
    }
    return false;
};
/**
 * ì°ìë ê¸ìê° ë°ë³µëëì§ ì²´í¬íì¬ ìì¼ë©´ true, ìì¼ë©´ falseë¥¼ ë¦¬í´íë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib 
 * @param word : ë¬¸ìì´
 * @return ì°ìë ê¸ìê° í¬í¨ëì´ ìì¼ë©´ true, ìëë©´ false
 * @example isContinuous("aa123");
 */
//ì°ìë ê¸ìê° ë°ë³µëëì§ ì²´í¬íë¤.
strLib.isContinuous = function(word) {
	var c0, c, c1;
	var con = true;
	var con1 = true;
	var con2 = true;

	for(var i=1; i<word.length; i++) {
		c0 = parseInt(word.charCodeAt(i-1));
		c = parseInt(word.charCodeAt(i));
		c1 = parseInt(word.charCodeAt(i-1)) + 1;

		if(c!=c0) {
			con1 = false;
		}
		if(c!=c1) {
			con2 = false;
		}
	}
	if(con1 == false && con2 == false) {
		con = false;
	}
	return con;
};
/**
 * ë¬¸ì(char)ì ì íì ë¦¬í´íë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> str ë¬¸ì(char)
 * @return <Number> íê¸ìì (1), íê¸ìëª¨(2), ì«ì(4), í¹ìë¬¸ì(8), ìë¬¸ë(16), ìë¬¸ì(32), ê¸°í(48)
 * @example strLib.getLocale(str);
 */
strLib.getLocale = function(str) {

    var locale = 0;
    if (str.length > 0) {
        var charCode = str.charCodeAt(0);

        if (charCode >= 0XAC00 && charCode <= 0XD7A3) { // íê¸ìì .[ 44032 ~ 55203 ]
            locale = 0X1; // 1
        } else if ((charCode >= 0X1100 && charCode <= 0X11F9) || (charCode >= 0X3131 && charCode <= 0X318E)) { // íê¸ìëª¨.[ 4352 ~ 4601 ]
            locale = 0X2; // 2
        } else if (charCode >= 0X30 && charCode <= 0X39) { // ì«ì.[ 48 ~ 57 ]
            locale = 0X4; // 4
        } else if ((charCode >= 0X20 && charCode <= 0X2F) || (charCode >= 0X3A && charCode <= 0X40) || (charCode >= 0X5B && charCode <= 0X60)
                || (charCode >= 0X7B && charCode <= 0X7E)) { // í¹ìë¬¸ì
            locale = 0X8; // 8
        } else if (charCode >= 0X41 && charCode <= 0X5A) { // ìë¬¸ ë.[ 65 ~ 90 ]
            locale = 0X10; // 16
        } else if (charCode >= 0X61 && charCode <= 0X7A) { // ìë¬¸ ì.[ 97 ~ 122 ]
            locale = 0X20; // 32
        } else { // ê¸°í
            locale = 0X30; // 48
        }
    }
    return locale;
};

/**
 * í¹ì ë¬¸ìê° í¬í¨ë ê²½ì° true ìëë©´ falseë¥¼ ë¦¬í´íë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> word ë¬¸ìì´
 * @return <Boolean> í¹ì ë¬¸ìê° í¬í¨ë ê²½ì° true ìëë©´ false
 * @example strLib.checkChar("abcd##ë¬´ê¶í");
 */
strLib.checkChar = function(str) {

    var m_Sp = /[$\\@\\\#%\^\&\*\(\)\[\]\+\_\{\}\`\~\=\|]/;
    var m_char;

    for ( var i = 1; i <= str.length; i++) {
        m_char = str.charAt((i) - 1);

        if (m_char.search(m_Sp) != -1) {
            return true;
        }
    }
    return false;
};

/**
 * ë¬¸ìì´ì ìë ¥ byte ë§í¼ë§ ì¶ë ¥íê³  ë§ì¤ì íë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> str ë¬¸ìì´
 * @param <Number> limit ê°ì ¸ì¬ byteê¸¸ì´
 * @return <String> limit ê¸¸ì´ ë§í¼ë§ì ë¬¸ìì´ì ë§ì¤ì ì²ë¦¬
 * @example var strResult = strLib.cutByteStr("abcdefghijklmn", 5);
 */
strLib.cutByteStr = function(str, limit) {

    var tmpStr = str;
    var byte_count = 0;
    var len = str.length;
    var dot = "";

    for ( var i = 0; i < len; i++) {
        byte_count += strLib.getByteCount(str.charAt(i));
        if (byte_count == limit - 1) {
            if (strLib.getByteCount(str.charAt(i + 1)) == 2) {
                tmpStr = str.substring(0, i + 1);
                dot = "...";
            } else {
                if (i + 2 != len)
                    dot = "...";
                tmpStr = str.substring(0, i + 2);
            }
            break;
        } else if (byte_count == limit) {
            if (i + 1 != len)
                dot = "...";
            tmpStr = str.substring(0, i + 1);
            break;
        }
    }
    return tmpStr + dot;
};

/**
 * ë°ì´í¸ ìë¥¼ ë°ííë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> chr ë¬¸ì
 * @returns <Number> ë°ì´í¸ì
 */
strLib.getByteCount = function(chr) {
    if (escape(chr).length > 4)
        return 2;
    else
        return 1;
};

/**
 * ì²«ë²ì§¸ ë¬¸ìë¥¼ ëë¬¸ìë¡ ë³íí´ì ë°ííë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> str ë¬¸ìì´
 * @returns <String> ì¹íë ë¬¸ìì´
 */
strLib.firstUpperCase = function(str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
};

/**
 * ì²«ë²ì§¸ ë¬¸ìë¥¼ ìë¬¸ìë¡ ë³íí´ì ë°ííë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> str ë¬¸ìì´
 * @returns <String> ì¹íë ë¬¸ìì´
 * @returns
 */
strLib.firstLowerCase = function(str) {
    return str.substring(0, 1).toLowerCase() + str.substring(1);
};


/**
 * XML, JSON Object ë¥¼ serialize/stringify íë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <Object> Object
 * @returns <String> serialize/stringify String
 */
strLib.serialize = function(object) {
    if (typeof object == 'string') {
        return object;
    } else if (jsonLib.isJSON(object)){
        return JSON.stringify(object);
    } else if (xmlLib.isXmlCoc(object)) {
        return WebSquare.xml.serialize(object);
    } else {
        return object;
    }
};

/**
 * ë¨ì´ ë¤ì 'ì'ì´ë 'ë'ì ë¶ì¬ì ë°ííë¤.
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> msg
 * @returns <String> ë³íë ë¬¸ìì´
 */
strLib.attachPostposition = function(msg) {
    if(strLib.isFinalConsonant(msg)) {
        msg = msg + "ì ";
    } else {
        msg = msg + "ë ";
    }
    return msg;
};

/**
 * ì¢ì±ì´ ì¡´ì¬íëì§ ì¬ë¶ë¥¼ ê²ì¬íë¤. 
 * 
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> str ë¬¸ìì´
 * @return <Boolean> true : ì¢ì±ì´ ì¡´ì¬, false ê·¸ì¸
 */
strLib.isFinalConsonant = function(str) {
    var code = str.charCodeAt(str.length - 1);
    if ((code < 44032) || (code > 55197)) {
        return false;
    }
    if((code -16)%28 == 0) {
        return false;
    }
    return true;
};


strLib.isValidDate = function isValidDate(str) {
    try
    {
    	str = str.replace(/-/g,'');

        // ìë¦¬ìê° ë§ì§ììë
        if( isNaN(str) || str.length!=8 ) {
            return false;
        }
         
        var year = Number(str.substring(0, 4));
        var month = Number(str.substring(4, 6));
        var day = Number(str.substring(6, 8));

        var dd = day / 0;

   
        if( month<1 || month>12 ) {
            return false;
        }
         
        var maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var maxDay = maxDaysInMonth[month-1];
         
        // ì¤ë ì²´í¬
        if( month==2 && ( year%4==0 && year%100!=0 || year%400==0 ) ) {
            maxDay = 29;
        }
         
        if( day<=0 || day>maxDay ) {
            return false;
        }
        return true;

    } catch (err) {
        return false;
    }                       
};

strLib.isValidYmd = function isValidYmd(str) {
    try
    {
    	str = str.replace(/-/g,'');

        // ìë¦¬ìê° ë§ì§ììë
        if( isNaN(str) || str.length!=6 ) {
            return false;
        }
         
        var year = Number(str.substring(0, 2));
        var month = Number(str.substring(2, 4));
        var day = Number(str.substring(4, 6));

        var dd = day / 0;

   
        if( month<1 || month>12 ) {
            return false;
        }
         
        var maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var maxDay = maxDaysInMonth[month-1];
         
        // ì¤ë ì²´í¬ ë¡ì§ ì¤íµ, ëë êµ¬ë¶ì´ ë¬¸ì ìì¼ë¡ ì²´í¬ ë¶ê°
        
        if( month==2 ) {	
            maxDay = 29;
        }
         
        if( day<=0 || day>maxDay ) {
            return false;
        }
        return true;

    } catch (err) {
        return false;
    }                       
};

// ë ì§ íìì ê°ì ë°ìì ë§ ëì´ë¥¼ return í´ ì£¼ë í¨ì.
// yyyy-MM-dd ëë yyyyMMdd íìì¼ë¡ ë£ì´ì ì¬ì©íë©´ ë©ëë¤.
strLib.calcAge = function calcAge(birth) {
	
	if (birth.length < 7) {
		if (birth.substr(0, 2) < 19) {
			birth = '20' + birth;
		} else {
			birth = '19' + birth;
		}
		
	}
    var date = new Date();
    var year = date.getFullYear();
    var month = (date.getMonth() + 1);
    var day = date.getDate();       
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    var monthDay = month + day;       

    birth = birth.replace('-', '').replace('-', '');
    var birthdayy = birth.substr(0, 4);
    var birthdaymd = birth.substr(4, 4);
    var age = monthDay < birthdaymd ? year - birthdayy - 1 : year - birthdayy;

    return age;
}; 

//19ì¸ ì´í ê³ì½ ë° ê³ì¢ ë± ë±ë¡ ë¶ê° ì²ë¦¬ 
 
strLib.minor = function minor(birth,str) {

	if (strLib.calcAge(birth) < 19 ) {                                                                                                                                                      
	    comLib.alert(" ë¯¸ì±ëìë " + str + "ì íí  ì ìì(ë§ 19ì¸ ì´ìë§ ê¸°ìê°ë¥).");                                                                                                                                     
	    return true;
	};	 
	return false;
}; 

/* ==========================================================================================
 * í´ë¹ íë¡ì í¸ìì ìë¡ ë§ë  ë©ìëë¤ì ì ìíë¤.
 * ========================================================================================== */

