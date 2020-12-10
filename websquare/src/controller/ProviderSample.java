package controller;

import java.util.Arrays;

import org.w3c.dom.Document;

import websquare.http.controller.grid.excel.write.IExternalGridDataProvider;
import websquare.util.XMLUtil;

public class ProviderSample implements IExternalGridDataProvider {

	@Override
	public String[] getData(Document requestObj) throws Exception {
        //전달받은 XML문자열에서 key값을 추출 가능
        String key=XMLUtil.getText(requestObj, "key");
        System.out.println("key: "+key);
         
        //DB에서 데이터를 조회하는 비즈니스 로직 구현
        String[] returnStr=new String[21];
        String[] returnStr2=new String[21];
        returnStr2[0] = "1";
        returnStr2[1] = "1";
        returnStr2[2] = "accusamus beatae ad facilis cum similique qui sunt";
        returnStr2[3] = "https://via.placeholder.com/600/92c952";
        returnStr2[4] = "https://via.placeholder.com/150/92c952";
        returnStr2[5] = "q";
        returnStr2[6] = "w";
        returnStr2[7] = "e";
        returnStr2[8] = "r";
        returnStr2[9] = "t";
        returnStr2[10] = "n";
        returnStr2[11] = "1";
        returnStr2[12] = "1";
        returnStr2[13] = "accusamus beatae ad facilis cum similique qui sunt";
        returnStr2[14] = "https://via.placeholder.com/600/92c952";
        returnStr2[15] = "https://via.placeholder.com/150/92c952";
        returnStr2[16] = "q";
        returnStr2[17] = "w";
        for(int i=0; i<returnStr2.length; i++){
            returnStr[i] = returnStr2[i];
        }
        
        System.out.println("returnStr: "+Arrays.toString(returnStr));
         
        //조회된 데이터를 문자열 배열로 return
        return returnStr;
	}

}
