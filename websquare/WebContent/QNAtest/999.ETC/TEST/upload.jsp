<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page
	import="java.io.File
                , java.io.IOException
                , java.io.PrintWriter
                , java.util.List
                , java.text.SimpleDateFormat
                , java.util.Date
                , java.util.Locale
                , javax.servlet.ServletException
                , javax.servlet.http.HttpServlet
                , javax.servlet.http.HttpServletRequest
                , javax.servlet.http.HttpServletResponse
                , org.apache.commons.fileupload.FileItem
                , org.apache.commons.fileupload.disk.DiskFileItemFactory
                , org.apache.commons.fileupload.servlet.ServletFileUpload
                , java.lang.*
                , java.util.*"%><%!// location to store file uploaded
	private static final String UPLOAD_DIRECTORY = "upload";

	// upload settings
	// private static final int MEMORY_THRESHOLD = 1024 * 1024 * 3; // 3MB
	private static final int MAX_FILE_SIZE = 1024 * 1024 * 1024 * 1; // 1GB
	// private static final int MAX_REQUEST_SIZE = 1024 * 1024 * 50; // 50MB%>
<%
	// 혹은 서버에서 fileList를 넘겨받은 후 해당하는 file의 index를 매겨주는 방법
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
	response.setHeader("Access-Control-Allow-Headers", "content-type,submissionid");
	request.setCharacterEncoding("UTF-8");

	// System.out.println("upload.jsp start==============");

	// configures upload settings
	DiskFileItemFactory factory = new DiskFileItemFactory();

	// sets memory threshold - beyond which files are stored in disk
	// factory.setSizeThreshold(MEMORY_THRESHOLD);

	// sets temporary location to store files
	factory.setRepository(new File(System.getProperty("java.io.tmpdir")));

	ServletFileUpload upload = new ServletFileUpload(factory);

	// sets maximum size of upload file
	upload.setFileSizeMax(MAX_FILE_SIZE);

	// sets maximum size of request (include file + form data)
	// upload.setSizeMax(MAX_REQUEST_SIZE);

	// constructs the directory path to store upload file
	// this path is relative to application's directory
	//String uploadPath = getServletContext().getRealPath("") + File.separator + UPLOAD_DIRECTORY;
	String uploadPath = "C:\\Users\\KimGleam\\Desktop";

	// creates the directory if it does not exist
	File uploadDir = new File(uploadPath);
	if (!uploadDir.exists()) {
		uploadDir.mkdir();
	}

	try {
		List<FileItem> formItems = upload.parseRequest(request);

		String savedfilename = "";
		String fieldData = "";
		String filesize = "";
		String callbackFunction = request.getParameter("callbackFunction");
		
		String FileName = "";
		String getParam = "";
		int FileIndex = 0;
		int count = -1;

		if (formItems != null && formItems.size() > 0) {
			for (FileItem item : formItems) {
				if (item.isFormField()) {
					String tmp = item.getString();
					if (tmp.indexOf("fakepath") > -1) {
						// 단일 업로드에서 호출하는 경우
						tmp = tmp.substring(tmp.indexOf("fakepath") + 9);
					}
					String lu = new String(tmp.getBytes("8859_1"), "UTF-8");
					fieldData = lu;

					String fieldName = item.getFieldName();
					fieldName = new String(fieldName.getBytes("8859_1"), "UTF-8");

					if (fieldName.equals("Filename")) {
						FileName = fieldData;
					}
					// xml에서 가져온  키겂 "seq"의 data
					else if (fieldName.equals("seq")) {
						getParam = fieldData;
						System.out.println("@@ getParam = " + getParam);
						System.out.println("@@ fileName = " + FileName);

						StringBuilder stb1 = new StringBuilder();
						
						ArrayList<Integer> list = new ArrayList<Integer>();
						list.add(1);
						list.add(2);
						System.out.println(list.toString());
						
						// 내려온 파일명에 '&'가 들어갈 경우 xml에서 parsing할 때 오류가 나지 않도록 치환
						String fileEncode = savedfilename.replace("&", "&amp;");

						stb1.append("<script>window.onload = doInit;function doInit() {");
						stb1.append("parent." + callbackFunction + "(\"<ret>");
						stb1.append("<key>" + uploadPath + "</key>");
						stb1.append("<storedFileList>" + fileEncode + "</storedFileList>");
						stb1.append("<localfileList>" + getParam + "</localfileList>");
						stb1.append("<fileSizeList>" + filesize + "</fileSizeList>");
						stb1.append("<maxUploadSize></maxUploadSize>");
						stb1.append("<deniedList></deniedList>");
						stb1.append("<deniedCodeList></deniedCodeList>");
						stb1.append("</ret>\");}</script>");

						out.println(stb1.toString());
					}
				} else {
					SimpleDateFormat mSimpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS",
							Locale.KOREA);
					String newdate = mSimpleDateFormat.format(new Date());
					savedfilename = fieldData;

					String filePath = uploadPath + File.separator + savedfilename;

					File storeFile = new File(filePath);
// 					item.write(storeFile);
					filesize = String.valueOf(storeFile.length());
				}
			}
		}

	} catch (Exception ex) {
		request.setAttribute("message", "There was an error: " + ex.getMessage());
	}
%>