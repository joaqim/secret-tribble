from __future__ import print_function
import os, json, string
from pprint import pprint

test = {'cheese': 'cake'}

directory = "agot/history/characters/test"
typ = "characters"

for root, dirs, files in os.walk(directory+"/"+typ):
    for file in files:
        if file.endswith(".txt"):
            print(os.path.join(root, file))
            with open(os.path.join(root, file)) as f:
                id = ""
                json_text =  '[{"'+ typ +'": [\n'
                op = False
                inb = False

                n = 0
                ne = 0
                nf = False
                #for line in f:
                    #line = line.replace('"', '')
                    
                    
                for line in f:
                    line = line.replace('"', '')
                    
                        
                    if n!=0:
                        newLine+=('}')
                        n = 0
                    elif line[0] == '}':
                        id = ""
                        json_text += '}'
                    else:
                        if line[0].isdigit():
                            for n in line:
                                if n.isdigit():
                                    id += n
                                else:
                                    break
                            if inb:
                                #json_text+=','
                                newLine = ','
                            #json_text+='{'
                            if nf:
                                line = ',{'
                            else:
                                line = '{'
                            newLine = '{'
                        elif 'add_trait' in line:
                            newLine = ""
                            if ne == 0:
                                #print ("adds_trait={")
                                newLine += ('\tadd_trait={\n\t')
                            else:
                                newLine += "\t"
                            for i in range(0, len(line)):
                                l  = line[i]
                                if l == "=":
                                    if line[i+1] != ' ' and line[i+2] != ' ' and line[i+3] != ' ' and line[i+1] != '{' and line[i+2] != '{' and line[i+3] != '{':
                                        #print('trait'+ str(ne) +'='+ line[i+1:len(line)]+'')
                                        newLine +=('trait'+ str(ne) +'='+ line[i+1:len(line)-1]+'\n')
                                        ne+=1
                                    else:
                                        ne=0
                                        #print("adds_trait={")
                                        newLine += ("add_trait={")
                            line = newLine
                            
                        elif ne!=0:
                            line += '}'
                            #print('}')
                            ne = 0
                        newLine = ""
                        for i in range(0, len(line)):
                            l = line[i];
                            if l == '#':
                                #newLine = ""
                                break
                            if l != '"' and l != '{' and l != '}' and l != ' ' and l!='=' and l!='\t' and l!= '\n' and l!= ',':
                                if not op:
                                    if inb and len(newLine)>0:
                                        if newLine[0] == '{':
                                            newLine = '!,' + newLine
                                        else:
                                            newLine += ','
                                        inb = False
                                    newLine += '"' 
                                    op = True
                            elif op:
                                
                                newLine += '"'
                                op = False
                                if i< len(line):
                                    if line[i] !=' ' and line[i] !='}' and line[i] !='=' and line[i] !='"':
                                        #newLine += ','
                                        inb = True
                                elif i< len(line)-2:
                                    if line[i+1] !=' ' and line[i+1] !='}' and line[i+1] !='\t' and line[i+1] !='=' and line[i+1] !='"':
                                        newLine += '!1,'
                                elif i<= len(line)-3:
                                    if line[i+2] !=' ' and line[i+2] !='}' and line[i+2] !='\t' and line[i+2] !='=' and line[i+2] !='"':
                                        newLine += '!2,'
                            
                            newLine += l
                            if l == '}':
                                inb = True
                                nf = True
                            if l == '{':
                                inb = False
                            
                            if l == "=!!":
                                if line[i-1] != '"':
                                    newLine = '"' + newLine + '":'
                                else:
                                    newLine += ':'
                                if i<= len(line)-2:
                                    if line[i+1] != '"' and line[i+1] != '{' and line[i+1] != '}' and not line[i+1].isdigit():
                                        newLine += '"'
                                        op = True
                            #print (newLine)
                        json_text += newLine + '\n'
                json_text += "]}]"
                json_text = json_text.replace('=',':')
                json_text = json_text.replace('" "','","')
                
                json_text = json_text.replace('{ ,"d','{"d')
                json_text = json_text.replace('{\t,"d','{"d')

                json_text = json_text.replace('{ ,"f','{"f')
                json_text = json_text.replace('{\t,"f','{"f')
                json_text = json_text.replace('{,"f','{"f')
                #print (json_text)

                try:
                    json_data = json.loads(json_text)
                except ValueError as e:
                    print("Error at: ", e)
                
                fd = open('newFile'+file+'.json', 'w')
                fd.write(json_text)
                fd.close()

                #for x in json_data:
                    #print(x[typ][0]['name'])
