const m = require('../main')


m.log('this will be printed')
m.setLogFile('log_file', false, absolutePath = false)

m.stopLog()
m.startFileLog()

m.log('this will be appended to log_file')

m.stopFileLog()
m.startLog()

m.log('this will be printed to the console, but not appended to log_file')

m.setFilePrefix('very useful prefix')
m.startFileLog()

m.log('try try try')
