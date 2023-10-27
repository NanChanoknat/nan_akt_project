import axios from 'axios'

const TOKENWMS = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnQiOiJkMjF6TFhOMFowQmhhMmwwWVRweGQyVnlkSGt4TWpNMFFBPT0iLCJkaXNwbGF5TGFuZ3VhZ2UiOnsiY29kZTIiOiJUSCIsImNvZGUzIjoiVEhBIiwibmFtZSI6IlRoYWlsYW5kIiwiaWQiOjEwNn0sInByZWZBdXRvTWVzc2FnZUxhbmd1YWdlIjoiVEgiLCJzdGF0dXMiOiJhY3RpdmUiLCJjcmVhdGVkQnkiOnsiZW1haWwiOiJzeXN0ZW1AYWtpdGFodWIuY29tIn0sInVwZGF0ZWRCeSI6eyJlbWFpbCI6InN5c3RlbUBha2l0YWh1Yi5jb20ifSwid2FyZWhvdXNlIjp7InN0YXR1cyI6ImFjdGl2ZSIsInR5cGUiOiJ2ZW5kb3IiLCJuYW1lIjoiTmFuIDIxMTUiLCJzaG9ydG5lc3NOYW1lIjoiTmFuIDIxMTUiLCJwcm92aWRlciI6eyJuYW1lIjoidmVuZG9yX2FraXRhIiwidHlwZSI6InZlbmRvciIsImlkIjoiNWYzY2ZhNTRmMTFhZmVlZWI5ZjIxZmYxIn0sImNvZGUiOiIxNjc2NTI5MDk1NzE3IiwiaWQiOiI2M2VkY2RjNzBiYmNkYjM3YWExYzM1OTcifSwicm9sZXMiOlt7InBlcm1pc3Npb25zIjpbInN0b3JlLnN0b3JlLioiLCJzdG9yZS5zdG9yZS5yZWFkIiwic3RvcmUuc3RvcmUuY3JlYXRlIiwic3RvcmUuc3RvcmUuZWRpdCIsInN0b3JlLnN0b3JlLmRlbGV0ZSIsInN0b3JlLmlkZW50aWZ5LmFwcHJvdmUiLCJzdG9yZS5pZGVudGlmeS5yZWplY3QiLCJ3bXMucHJpY2luZ1BsYW4uKiIsIndtcy5wcmljaW5nUGxhbi5yZWFkIiwid21zLnByaWNpbmdQbGFuLmNyZWF0ZSIsIndtcy5wcmljaW5nUGxhbi5lZGl0Iiwid21zLndhcmVob3VzZS4qIiwid21zLndhcmVob3VzZS5yZWFkIiwid21zLndhcmVob3VzZS5jcmVhdGUiLCJ3bXMud2FyZWhvdXNlLmVkaXQiLCJ3bXMud2FyZWhvdXNlLmRlbGV0ZSIsIm1hbmFnZW1lbnQucm9sZS4qIiwibWFuYWdlbWVudC5yb2xlLnJlYWQiLCJtYW5hZ2VtZW50LnJvbGUuY3JlYXRlIiwibWFuYWdlbWVudC5yb2xlLmVkaXQiLCJtYW5hZ2VtZW50LnJvbGUuZGVsZXRlIiwibG9naXN0aWMudHJhY2tpbmdOdW1iZXIuKiIsImxvZ2lzdGljLnRyYWNraW5nTnVtYmVyLnJlYWQiLCJsb2dpc3RpYy50cmFja2luZ051bWJlci5jcmVhdGUiLCJvcmRlci1yZXBvcnQub3JkZXIuKiIsIm9yZGVyLXJlcG9ydC5vcmRlci5yZWFkIiwib3JkZXItcmVwb3J0Lm9yZGVyLmV4cG9ydCIsIm9yZGVyLXJlcG9ydC5pbnZvaWNlLioiLCJvcmRlci1yZXBvcnQuaW52b2ljZS5yZWFkIiwib3JkZXItcmVwb3J0Lmludm9pY2UuZXhwb3J0Iiwid21zLmZ1bGZpbGxtZW50UmVwb3J0LioiLCJ3bXMuZnVsZmlsbG1lbnRSZXBvcnQucmVhZCIsIndtcy5mdWxmaWxsbWVudFJlcG9ydC5leHBvcnQiLCJ3bXMuZ29vZHNSZWNlaXB0UmVwb3J0LioiLCJ3bXMuZ29vZHNSZWNlaXB0UmVwb3J0LnJlYWQiLCJ3bXMuZ29vZHNSZWNlaXB0UmVwb3J0LmV4cG9ydCIsIndtcy5wYXJjZWxSZXBvcnQuKiIsIndtcy5wYXJjZWxSZXBvcnQucmVhZCIsIndtcy5wYXJjZWxSZXBvcnQuZXhwb3J0Iiwib3JkZXIub3JkZXJSZXBvcnQuKiIsIm9yZGVyLm9yZGVyUmVwb3J0LnJlYWQiLCJvcmRlci5vcmRlclJlcG9ydC5leHBvcnQiLCJ3bXMuKiJdLCJuYW1lIjoibWFuYWdlciIsImlkIjoiNjNlZGNkYzcwYmJjZGI1ODI2MWMzNTk5In1dLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTE2VDA2OjM3OjEzLjc2OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTAyLTE2VDA2OjM3OjEzLjc2OVoiLCJpZCI6NTcyLCJsYXN0TmFtZSI6IjIxMTUiLCJ0ZWwiOiIwOTAwMDA5MDk4IiwiZmlyc3ROYW1lIjoiTmFuIiwiZW1haWwiOiJuYW4yMTE1d21zQG1haWwuY29tIiwiaWF0IjoxNjg1Njc4MzA1LCJleHAiOjE3MTcyMTQzMDV9.JOLRlmMKpSwaxnBb0mZJEm46VFO5XS-T5Du3mia5Z-M"

export async function getPickoutWorksheetID(token : string){
    const url = 'https://api.staging.akitahub.com/wms/pickout-worksheets?state=pending,picking'
    const userToken = 'Bearer' + ' ' + token
    const headers = { Authorization : userToken }
    let response = 
        await axios.get(url,{headers}).then((response) => {
            // ถ้าทำงานสำเร็จ
            response = response.data.data[0].id
            return response
        })
        .catch((error) => {
            // ถ้าทำงานไม่สำเร็จ เกิดข้อผิดพลาด
            console.error(error)
        });
    
    let result = response
    // console.log(result)
    return result
    
}

// getPickoutWorksheetID(TOKENWMS)

export async function getPickoutWorksheetDetail(token : string){
    const pickoutWorksheetID = await getPickoutWorksheetID(token)
    
    const url = 'https://api.staging.akitahub.com/wms/pickout-shelves?pickout-worksheet-id='+pickoutWorksheetID
    const userToken = 'Bearer' + ' ' + token
    const headers = { Authorization : userToken }
    let shelfResponse
    let LocationResponse
    let boxResponse
    let response = 
        await axios.get(url,{headers}).then((response) => {
            // ถ้าทำงานสำเร็จ
            shelfResponse = response.data.data[0].shelf
            LocationResponse = response.data.data[0].shelf_boxes[0]
            boxResponse = response.data.data[0].shelf_boxes[0].pickout_boxes[0]
            return {response,shelfResponse,LocationResponse}
        })
        .catch((error) => {
            // ถ้าทำงานไม่สำเร็จ เกิดข้อผิดพลาด
            console.error(error)
        });
    
    let shelfResult = shelfResponse
    let locationResult = LocationResponse
    let boxResult = boxResponse
    // console.log(shelfResult)
    // console.log(locationResult)
    // console.log(boxResult)
    return {shelfResult,locationResult,boxResult}
    
}

// getPickoutWorksheetDetail(TOKENWMS)