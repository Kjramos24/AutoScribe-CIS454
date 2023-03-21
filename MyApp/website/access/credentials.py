import urllib
username = 'bryan'
password = 'BestWebsite1'
params = params = urllib.parse.quote_plus('Driver={ODBC Driver 18 for SQL Server};' \
             'Server=tcp:myautoscribe.database.windows.net,1433;' \
             f'Database=AutoScribe;' \
             f'Uid={username};' \
             f'Pwd={password};' \
             'Encrypt=yes;' \
             'TrustServerCertificate=no;' \
             'Connection Timeout=30')
