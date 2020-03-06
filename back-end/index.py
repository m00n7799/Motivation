import os
import subprocess
import re
import json
from Naked.toolshed.shell import execute_js,muterun_js
from tkinter import Tk, Menu, Frame, Label, Entry, Button,font


root = Tk()
root.title("Final")
root.minsize(500,500)
root.configure(background = 'tan')

def show():
    file = open('user.txt', 'w')
    file.write(entry1.get())
    file.close()
    signIn.config(text = "Welcome " + entry1.get())
    nameFL.config(text = "The following app are being shut down - ", padx =(20))
    password.config(text = "Minecraft \n Steam \n Epic Games \n Battle.net \n Uplay \n Origin")

    # nameFL.destroy()
    # password.destroy()

    entry1.destroy()
    entry2.destroy()
    btn1.destroy()

    grade_check()

def grade_check():
    succ = execute_js('index.js')
    print(succ)

    if succ:
    

        grades = []
        games = []

        # file = open('./back-end/studentGrades.json', 'r')
        file = open('test.json', 'r')
        file2 = open('games.json', 'r')
        # print(file.read())
        fileRead = json.loads(file.read())
        fileRead2 = json.loads(file2.read())
        num = 1
        for item in fileRead:
            # print(item['arr'])
            grades= item['arr']
            num +1
        for item2 in fileRead2:
            games = item2['games']

        file.close()
        # print(games[0])

        for inx in grades:
            if inx == 'F':


                tasks = subprocess.check_output(['tasklist']).decode('utf-8').split('\r\n')
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
                helper = 0
                num2 = 0
                for idk in listOfitems:
                    if idk['image'] == games[helper]:
                        x = 'taskkill /F /PID ' + idk['pid']
                        os.system(x)
                        
                    # if idk['image'] == games[1]:
                    #     x = 'taskkill /F /PID ' + idk['pid']
                    #     os.system(x)
                    # if idk['image'] == games[2]:
                    #     x = 'taskkill /F /PID ' + idk['pid']
                    #     os.system(x)
                    # if idk['image'] == games[3]:
                    #     x = 'taskkill /F /PID ' + idk['pid']
                    #     os.system(x)
                    # if idk['image'] == games[4]:
                    #     x = 'taskkill /F /PID ' + idk['pid']
                    #     os.system(x)
                    # if idk['image'] == games[5]:
                    #     x = 'taskkill /F /PID ' + idk['pid']
                    #     os.system(x)
                    helper +=1
                    if helper==len(games):
                        helper=0
                    # print(games[helper])
                        
    else:
        print('oof')
    root.after(20000, grade_check)
root.after(20000, grade_check)
frame1 = Frame(root)
frame2 = Frame(root)
frame3 = Frame(root)

frame1.grid(column = 0, row = 0)
signIn = Label(frame1, text = 'Sign In',fg = 'black',bg = 'tan', font = 'Arial 18 bold', padx =(50))
nameFL = Label(frame2, text = 'Name: ',fg = 'black',bg = 'tan', font = 'Arial 18 bold')
password = Label(frame3, text = 'Password: ',fg = 'black',bg = 'tan', font = 'Arial 18 bold')

entry1 = Entry(root, text='Name', width = 30)
entry2 = Entry(root, show='*',text = 'Password', width = 30)

frame1.grid(row=0, column = 0)
frame2.grid(row=1)
frame3.grid(row = 2)



signIn.pack(side = 'top')

nameFL.pack(side = 'top')
entry1.grid(row=1, column = 1)
password.pack(side = 'top')
entry2.grid(row=2, column = 1)

btn1 = Button(root, text='Sign In', command=show)
btn1.config(height = 2, width = 20)

btn1.grid(row=3,column=1)

root.mainloop()
