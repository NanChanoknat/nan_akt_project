*** Settings ***
Library           SeleniumLibrary

*** Test Cases ***
Find Elements by Name
    Open Browser    https://www.example.com    Chrome
    ${elements}     Run Keyword And Ignore Error    Find Elements By Name
    Log List        ${elements}
    Close Browser

*** Keywords ***
Find Elements By Name
    ${elements}=    None
    :Try
        ${elements}=    SeleniumLibrary.Find Elements By Name    email
    :Except    AttributeError
        Log    'find_elements_by_name' method not found
    [Return]    ${elements}
