<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.Enumeration"%>
<%@page import="java.io.File"%>
<%@page import="java.util.ArrayList"%>
<%
	String contextPath = request.getContextPath();
	//System.out.println(">ContextPath>>>"+contextPath+"<<<");

//	System.out.println(">WEBSQUARE_HOME>>>"+System.getProperty("WEBSQUARE_HOME")+"<<<");

	String curentFilePath = request.getServletPath(); // 본 소스 파일명

//	System.out.println(">curentFilePath>>>"+curentFilePath+"<<<");
	
/*
	Enumeration eee = System.getProperties().propertyNames();
	while(eee.hasMoreElements()){
		String obj = (String)eee.nextElement();
		System.out.println(obj + ">>>>>" + System.getProperty(obj));
	}
*/

	String directory = request.getParameter("directory");
	if(directory == null || directory.equals("")){
		directory = request.getSession().getServletContext().getRealPath("");
	}
//	System.out.println(">directory>>>>" + directory);
	
	String xmlFilePath = contextPath + request.getParameter("xmlFilePath");
	if(xmlFilePath == null || xmlFilePath.equals("") || xmlFilePath.equals("null")){
		xmlFilePath = "/";
	}
	
	//System.out.println(">xmlFilePath>>>>" + xmlFilePath);
	
	File fff = new File(directory);
	
	
	// 엔진 버전 셀렉트박스 만들기 위해
	// server.xml 파일에 아래와 같이 설정했음
	/*
		<Context path="/2.0_1.1601A.20111230.145318_1.5" docBase="C:\inswave\WEB\websquare_engine\2.0_1.1601A.20111230.145318_1.5" debug="0" privileged="true" reloadable="true" 
			crossContext="false" workDir="C:\inswave\WEB\websquare_engine\work">
		</Context>

	*/
	// docBase 경로에 enginePath 경로가 지정되어 있음
	String enginePath = "/Applications/apache-tomcat-7.0.29/webapps";
	File engineVer = new File(enginePath);
	
	String[] engineList = engineVer.list();
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
	<meta http-equiv="X-UA-Compatible" content="IE=Edge"></meta>
	<title>예제 목록</title>
	
	<script type="text/javascript">
		function openWindow(websquareURL){
			var websquareVersion = document.engine.version.value;
			if(websquareVersion != ""){
				window.open("/" + websquareVersion + websquareURL);
			}else{
				window.open(websquareURL);
			}
		}


		function setEngine(obj){
			document.getElementById("engineVer").innerHTML = obj.value;
		}


window.onload = function(){
	document.getElementById("engineVer").innerHTML = document.getElementById("version").value
}

	</script>
</head>
<body>
<%
if(fff.isDirectory()){
%>
	<h2><%="검색 디렉터리>>>"+directory%></h2>
	<form name="engine" id="engine">
		<h3>엔진 버전 :
			<select name="version" id="version" onchange="setEngine(this)">
				<%
				System.out.println(engineList.length-13);
				for(int i = 0; i < engineList.length; i++){
					//System.out.println("engineList["+i+"] : "+engineList[i]  );
					File tempFile = new File(enginePath + System.getProperty("file.separator") + engineList[i] );
					if(tempFile.isDirectory()){
					
					

						if(engineList[i].indexOf("0_1") == 2){
							if(i ==  (engineList.length-13)){
								//System.out.println("test "+ i );
							%>
								<option selected value="<%=engineList[i] %>"><%=engineList[i] %></option>
							<%
							}
							else{
							%>
							<option value="<%=engineList[i] %>"><%=engineList[i] %></option>
							<%
							}
						}
					}
				}
				%>
			</select>
			<span id="engineVer"></span>
		</h3>
	</form>
	
	<ul>
<%if(!xmlFilePath.equals("/")){
	String temp001 = directory.substring(0, directory.lastIndexOf(System.getProperty("file.separator")));
		
	String[] tempArr = xmlFilePath.split("/");
	String temp002 = "";
		
	for(int i=0;i<tempArr.length-1;i++){
		temp002 += tempArr[i]+"/";
		//System.out.println("2>tempArr["+i+"]>>>"+tempArr[i]+"<<<");
		
	}
	
	//System.out.println("2>temp003>>>"+temp003+"<<<");

%>
		<li><font size="4"><a style="font-weight:bold;" href="<%=contextPath%><%=curentFilePath%>?directory=<%=temp001%>&xmlFilePath=<%=contextPath + temp002 %>"><%="상위>>> .."%></a></li>
<%
}
	String fileList[] = fff.list();
	for(String temp : fileList){
		
		File ff = new File(directory + System.getProperty("file.separator") + temp);
		if(ff.isDirectory()){
			// directory filter
			if(
				!temp.equals("WEB-INF") && !temp.equals("META-INF") 
				&& !temp.equals("websquare") && !temp.equals(".svn") 
				&& !temp.equals("")&& !temp.equals(".settings")
			){
%>
			<li><font size="3"><a style="color:red;" href="<%=contextPath%><%=curentFilePath%>?directory=<%=directory + System.getProperty("file.separator") + temp%>&xmlFilePath=<%=contextPath + xmlFilePath + temp + "/"%>"><%="디렉터리>>>"+ temp%></a></li>
<%
			}
		}else{
			// extension filter
			String extensionStr = temp.substring(temp.length()-4, temp.length());
			if(extensionStr.equals(".xml") || extensionStr.equals(".XML")){
				// websquare.jsp 로 실행해야 할 예제 폴더명
				if( "/form/".equals(xmlFilePath) ){
%>
			<li><font size="3"><a style="color:blue;" href="#" onclick="openWindow('<%=contextPath%>/websquare/websquare.jsp?w2xPath=<%=xmlFilePath + temp%>');"><%=temp%></a></font></li>
<%
				}else{
%>
			<li><font size="3"><a style="color:blue;" href="#" onclick="openWindow('<%=contextPath%>/websquare/websquare.html?w2xPath=<%=xmlFilePath + temp%>');"><%=temp%></a></font></li>
<%
				}
			}else if(extensionStr.equals("html") || extensionStr.equals("HTML")){
%>
			<li><a target="_blank" href="<%=contextPath + xmlFilePath + temp%>"><%="예제>"+temp%></a></li>
<%
			}
		}
	}
%>
	</ul>
<%
}else{
%>
	<h1><%=directory + " 는 디렉터리가 아닙니다"%></h1>
<%
}
%>
</body>
</html>