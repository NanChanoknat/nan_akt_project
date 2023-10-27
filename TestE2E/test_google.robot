*** Settings ***
Documentation                                      This is a basic test
Library                                            SeleniumLibrary

*** Variables ***
${url}                                              https://www.google.com
${browser}                                          chrome
${search_button}                                    xpath=//html/body/div[1]/div[3]/form/div[1]/div[1]/div[3]/center/input[1]


*** Test Cases ***
User fill in the Search text box
    [Documentation]                                 The user search 'Test Definition'
    Open google

Open example
    ${1_index} =    Open Browser    http://example.com/    chrome    alias=Chrome
    ${data}    Get Text    xpath: /html/body/div/h1
    Log To Console    ${data}

Search Cat on Google
    Open Browser    https://www.google.com    Chrome
    Input Text      name=q                  cat
    Click Button    name=btnK
    

*** Keywords ***
Open google
    open browser                                    ${url}    ${browser}
    wait until page contains                        ${URL}


    
    

