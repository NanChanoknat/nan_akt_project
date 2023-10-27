*** Settings ***
Library    SeleniumLibrary



*** Test Cases ***
Example
    ${1_index} =    Open Browser    https://oms.staging.akitahub.com    chrome    alias=Chrome
    Wait Until Element Is Visible    id:1-email
    Input Text    id:1-email    j@gmail.com
    Input Text    xpath: //input[@type="password"]    Ananyaporn24
    Click Button    xpath: //button[@type="submit"]