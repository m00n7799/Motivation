import os
import subprocess
import re
import json

# import firebase_admin
# from firebase_admin import credentials, firestore

# cred = credentials.Certificate("back-end\capstone-a6a52-firebase-adminsdk-3umjr-aed3380b3b.json")
# firebase_admin.initialize_app(cred)

# db = firestore.client()

# ref = db.collection(u'Users').document(u'1')
# print(ref)
grades = []

# file = open('./back-end/studentGrades.json', 'r')
file = open('studentGrades.json', 'r')


fileRead = json.loads(file.read())
for item in fileRead:
    # print(item['Grades'])
    grades= item['Grades']
file.close()
# print(grades)

for inx in grades:
    if inx == 'F':
        while True:

            tasks = subprocess.check_output(['tasklist']).split('\r\n')
            listOfitems = []
            for task in tasks:
                regex = re.match("(.+?) +(\d+) (.+?) +(\d+) +(\d+.*K).*",task)
                if regex is not None:
                    listOfitems.append({'image':regex.group(1),
                                "pid":regex.group(2),
                                "session_name":regex.group(3),
                                "session_num":regex.group(4),
                                "mem_usage":regex.group(5)
                                })


        # print(p)  
            for idk in listOfitems:
            # print(idk['image'])
                if idk['image'] == 'MinecraftLauncher.exe':
                    x = 'taskkill /F /PID ' + idk['pid']
                    os.system(x)
                
                if idk['image'] == 'Steam.exe':
                    x = 'taskkill /F /PID ' + idk['pid']
                    os.system(x)
                if idk['image'] == 'EpicGamesLauncher.exe':
                    x = 'taskkill /F /PID ' + idk['pid']
                    os.system(x)
                if idk['image'] == 'Battle.net.exe':
                    x = 'taskkill /F /PID ' + idk['pid']
                    os.system(x)
                if idk['image'] == 'UplayWebCore.exe':
                    x = 'taskkill /F /PID ' + idk['pid']
                    os.system(x)
                if idk['image'] == 'Origin.exe':
                    x = 'taskkill /F /PID ' + idk['pid']
                    os.system(x)