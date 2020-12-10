package controller;

import websquare.http.controller.grid.excel.read.ICellDataProvider;

public class ExcelUploadDataConverter implements ICellDataProvider{
	
	public String convertValue(String cellvalue) throws Exception{
        //br Tag는 \n으로 변경
        String value = cellvalue.replaceAll("<(/)?([bB][rR])?(\\s\\S*)*(/)?>", "\n");
        //모든 tag 데이터 제거
        value = value.replaceAll("<[^>]*>", "");
        return value;
	}
	
}
