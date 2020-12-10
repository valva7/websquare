/** 
 * @file 공통 처리용 유틸성 기능을 제공한다.
 * 공통 코드 호출 및 컴포넌트 연동, 통신 메세지 처리 등
 * @version 2.0
 * @author InswaveSystems
 * 
 */
var common = "common";
/**
 * 공통 처리용 유틸성 기능을 제공한다.
 * @type com
 * @class com
 * @namespace com
 */
com = {
	CONTEXT_PATH : "/ws5", // Context Path 경로
	DEFAULT_OPTIONS_MODE : "asynchronous", // 기본 통신 모드 ( asynchronous / synchronous)
	DEFAULT_OPTIONS_MEDIATYPE : "application/json", // 기본 미디어 타입
	MESSAGE_CODE : {
		STATUS_ERROR : "E",
		STATUS_SUCCESS : "S",
		STATUS_WARNING : "W"
	},
	_commonCodeInfo : {
		idPrefix:"dlt_CmCode",
		label:"CODE_NM",
		value:"CODE_CD",
		fieldArr : ["GRP_CD","CODE_CD","CODE_NM"] 
	},
	/**
	 * config.xml에서 사용 visibleHelper로 엔진에서 사용. 단독 사용 금지.
	 * @private
	 * @date 2017. 3. 7.
	 * @memberOf com 
	 * @author InswaveSystems
	 */
	_setWebSquareContent : function(htmlStr){
		var contBox = document.getElementById("wsContent") || document.body; 
		contBox.innerHTML = htmlStr;
	},
	/**
	 * 총 행의 수와 화면에 보여질 행의 수를 가지고 페이지수를 반환한다.
	 * @date 2017. 3. 7.
	 * @param {Number} totalRowCount 총 행의 수
	 * @param {Number} rowCount 화면에 보여지는 행의 수
	 * @returns {Number} pageCount
	 * @memberOf com 
	 * @author InswaveSystems
	 * @example
	 * var rs = com.getPageSize(100,10);
	 * //return 예시) 10
	 * var rs2 = com.getPageSize(101,10);
	 * //return 예시) 11
	 */
	getPageSize : function(totalRowCount, rowCount){
		return Math.ceil(totalRowCount/rowCount);
	},
	/**
	 * 공통 코드를 데이터 객체로 생성할 때 사용되는 기본 포맷을 반환한다.
	 * @date 2017. 11. 09.
	 * @returns {JSON} commonCodeFormInfo
	 * @memberOf com 
	 * @author InswaveSystems
	 * @example
	 * var infoJSON = com.getCommonCodeInfo();
	 * //return 예시) {"idPrefix":"dlt_CmCode","label":"CODE_NM","value":"CODE_CD"}
	 */
	getCommonCodeInfo : function(){
		var info = this._commonCodeInfo;
		return {"idPrefix":info.idPrefix, "label":info.label, "value":info.value};
	},
	/**
	 * array형태의 코드 데이타를 key/value 형태의 json 형태로 반환한다.
	 * key는 code값이며 value는 code의 display값이 할당된다.
	 * 이 기능은 공통으로 가져온 code데이타를 기준으로 구현되어있으며 화면에 만들어진 코드를 가지고 생성한다.
	 * 즉, 화면에 코드 데이타가 없는 경우는 생성되지 않음.
	 * 사용법은 example 참조. 
	 * @date 2017. 11. 10.
	 * @param {String} codeIdArrStr 코드값을 ,로 구분한 문자.
	 * @returns {JSON} codeJSON	{"요청 코드값":{"value":"label","value":"label"}}
	 * @memberOf com 
	 * @author InswaveSystems
	 * @example
	 * //code key가 101이고 해당 코드값이 남성-M, 여성-F인 경우
	 * var codeJSON = com.getCodeJSON("101");
	 * //return 예시) {"101":{"M":"남성", "F":"여성"}}
	 * 
	 * //2건의 code를 가져오는 경우
	 * var codeJSON = com.getCodeJSON("101,102");
	 * //return 예시) {"101":{"M":"남성", "F":"여성"}, "102":{"01":"010", "02":"011", "03":"016"}}
	 *
	 */
	getCodeJSON : function(codeIdArrStr){
		if(!codeIdArrStr){
			alert("필수 파라메터가 누락되었습니다.");
			return;
		}
	
		var formJSON = com.getCommonCodeInfo(),
			prefix = formJSON.idPrefix, 
			i=0, codeAll, codeArr, codeArrLen, codeJSON,
			j, idArr = codeIdArrStr.split(","), idArrLen = idArr.length,
			tmpId, tmpJSON, rs={}, errId="";
			
		for(j=0;j<idArrLen;j++){
			idArr[j] = prefix+idArr[j];
		}
		
		codeAll = $p.data.get( "JSON" , idArr );
		
		for(j=0;j<idArrLen;j++){
			tmpId = idArr[j];
			codeArr = codeAll[tmpId];
			if(!codeArr){ 
				errId = errId+tmpId+",";
				continue; 
			}
			codeArrLen = codeArr.length;	
			tmpJSON={};
			for(i=0;i<codeArrLen;i++){
				codeJSON = codeArr[i];
				tmpJSON[codeJSON[formJSON.value]] = codeJSON[formJSON.label];
			}
			rs[tmpId.replace(prefix,"")] = tmpJSON;
		}
		
		if(errId){
			alert("요청하신 코드 중 처리되지 않은 코드가 있습니다.\n"+errId);
		}
		return rs;
	},
	/**
	 * com에 정의된 CONTEXT_PATH를 포함한 URL을 반환한다.
	 * @date 2017. 3. 20.
	 * @param {String} url URL경로
	 * @returns {String} CONTEXT가 포함된 URL경로
	 * @memberOf com 
	 * @author InswaveSystems
	 * @example
	 * //아래와 같이 CONTEXT가 정의된 경우
	 * com.CONTEXT_PATH = "ws5";
	 * var rs = com.getURL("/ws/sample.xml");
	 * //return 예시) "/ws5/ws/sample.xml"
	 * var rs2 = com.getURL("/edu/selectMember.do");
	 * //return 예시) "/ws5/edu/selectMember.do"
	 * var rs3 = com.getURL("/ws5/edu/selectMember.do");
	 * //return 예시) "/ws5/edu/selectMember.do"  
	 */
	getURL : function(url){
		var tmpPath = url.charAt(0) === "/" ? this.CONTEXT_PATH : this.CONTEXT_PATH +"/";
		
		if(url.startsWith( tmpPath+"/" ) || url.startsWith( "." )){
			return url;
		}else{
			return tmpPath+url;
		}
	},
	getI18NUrl : function(url) {

		var w2xPath = this.getURL( url);
		var URL = url.toUpperCase();

		if( URL.indexOf(".XML") > 0 ){
		    var locale = $p.local.getItem( "locale" );
		    if( locale == null || locale == '' ) {
		    	
		        return "/ws5/websquare/I18N.do?w2xPath="+w2xPath;
		    } else {
		    	
		        return "/ws5/websquare/I18N.do?locale="+unescape(locale)+"&w2xPath="+w2xPath;
		    }    
		} else {
			return w2xPath;
		}
	},	
	
	/**
	 * namespace에 정의된 객체를 반환한다.
	 * function명을 문자열로 받아 객체로 반환 받을 때 사용한다. 
	 * @date 2017. 9. 27.
	 * @param {String} objName 문자열 객체명
	 * @returns {Object} Object 
	 * @memberOf com 
	 * @author InswaveSystems
	 * @example
	 * //"com.getURL"과 같이 문자열로 받은 function을 객체화 시키고 싶을 때.
	 * var rsObj = com.getObjByNm("com.getURL");
	 * rsObj("/ws/sample.xml");	//반환 받은 function을 실행한다.
	 */
	getObjByNm : function(objName, _parentObj){
		if(typeof objName === "function"){
			return objName;
		}
		_parentObj = _parentObj || window;
		var idx = objName.indexOf("."), restStr;
		if(idx > 0){
			restStr = objName.slice(idx+1);
			if(restStr){
				return this.getObjByNm(restStr, _parentObj[objName.substr(0,idx)]);
			}
		}
		return _parentObj[objName];
	}
};


com.test = function () {
	alert("js/Common.js TEST");
}
