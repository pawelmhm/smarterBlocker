from selenium import webdriver
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome(executable_path="/home/pawel/py/chromedriver/chromedriver")#"/usr/bin/chromium-browser")
driver.get("http://google.com")
assert "Google" in driver.title
