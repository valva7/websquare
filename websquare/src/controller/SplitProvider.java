package controller;

import org.w3c.dom.Document;
import websquare.http.controller.grid.excel.write.IExternalSplitProvider;

public class SplitProvider implements IExternalSplitProvider {
	int cnt = 0; 
	int limtcnt = 10;
	boolean isEnd = false;
	
	public String[] getData(Document requestObj) throws Exception {
		String[] arr = new String[50];
		
        for(int i=0; i<arr.length; i++) {
            arr[i] = "TEST 데이터" +  Integer.toString(this.cnt);
        }

        this.cnt++;
		if( this.cnt >= this.limtcnt ){
			this.isEnd = true;
		}
		
		return arr;
	}

	public boolean sendCompleted() throws Exception {
		System.out.println(Integer.toString(this.cnt*100) + "row 생성 ");
		return isEnd;
	}

}
