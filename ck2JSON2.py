from __future__ import print_function
from collections import defaultdict
import os, json, string
from pprint import pprint

a = {"traits": ['wroth', 'rude'],
     "8254.1.1": {
         'death': {
             'death_reason': 'death_battle'
         }
     }
}

directory = "agot/history/characters/test"
typ = "characters"

for root, dirs, files in os.walk(directory + "/" + typ):
    for file in files:
        if file.endswith(".txt"):
            print(os.path.join(root, file))
            with open(os.path.join(root, file)) as f:
                idA = ""
                key = False
                value = False
                var = False
                aVar = ""
                aKey = ""
                aValue = ""
                inb = False
                onb = False
                for line in f:
                    line = line.replace('"', '')
                    line = line.replace(' = ', '=')
                    # line = line.strip()
                    if len(line) == 0:
                        break
                    elif line[0] == '}':
                        idA = ""
                    elif line[0].isdigit():
                        for n in line:
                            if n.isdigit():
                                idA += n
                            else:

                                break


                    else:
                        for i in range(0, len(line)):
                            l = line[i];
                            if l == '#':
                                break
                            elif l == '{':
                                inb = True
                            elif l == '}':
                                onb = True
                            elif l != '"' and l != '{' and l != '}' and l != ' ' and l != '=' and l != '\t' and l != '\n' and l != ',' and len(
                                    line) != 0:
                                var = True
                            elif l == '=':
                                key = False
                                var = False
                            else:
                                key = True
                                var = False
                            if var:
                                if key:
                                    # if inb:
                                    #    aKey+='{'
                                    #    inb = False
                                    aKey += l
                                else:
                                    aValue += l
                                    # if onb:
                                    #aValue +='}'
                                    #onb = False
                            else:
                                # if aKey!="":
                                #print('Key:'+aKey)
                                #    aKey = ""
                                if aValue != "" and aKey != "":

                                    #print('Key: '+aKey.strip())
                                    if inb:
                                        #print('{')
                                        inb = False

                                    if onb:
                                        #print('}')
                                        onb = False
                                    #print('Val: '+aValue.strip())
                                    aKey = ""
                                    aValue = ""

lines = open(directory + '/' + typ + '/iron_islands.txt').readlines()
my_dict = {}
newLine = ""
rawLines = ""
idA = ""
for line in lines:
    line = line.replace('"', '')
    line = line.replace(' = ', '=')
    line = line.replace('=', ':')
    line = line.replace('\n', ' ')
    # line = line.strip();
    # print(line)
    if len(line) != 0:
        if line[0].isdigit():
            for n in line:
                if n.isdigit():
                    idA += n
                else:
                    newLine = ' "idA:' + str(idA) + ' '
                    idA = ''
                    print(newLine)
                    break
                    #newLine += '{'

        #elif line[0] == '{':
        #    newLine += '{'
        #    pass
        else:
            for i in range(0, len(line)):
                l = line[i]
                if l == '#':
                    newLine += ' '
                    break

                elif l != '"' and l != '||' and l != 'A++' and l != '}<' and l != '|' and l != '\t' and l != '\n' and l != ',':
                    newLine += l
                    #elif l == ':':
                    #    newLine += l;
    rawLines += newLine
    newLine = newLine.split(':')
    #my_dict[newLine[0]] = [newLine[0]]

    # noinspection PyRedeclaration
    newLine = ""

for k, v in my_dict.items():
    print(k, v)
# print(my_dict)
# print(rawLines)


r = """(?x)
{
    (\w+)
    :
    (
        (?:
            [^{}]
            |
            (?R)
        )+
    )
}
"""

r = '(?<=^\[(?:(?>\[[^\]\[]+(?:\]|(?=\])))|(?>[^\[\]]+))*|^)[,\[\]]+'
z = '[1,"a b c",[1,"a b c","A B C"],"A B C"]'
#print (dict(regex.findall(r, z)))

def is_date(s):
    for l in s:
        if l.isdigit() or l == '.':
            pass
        else:
            return False
    return True


def recursive_bracket_parser(ns, s, i, op1, op2):
    while i < len(s):
        if s[i] == '{':
            op1 = False
            if op2:
                #ns+=',!!!!!!!!!!!!!!!!'
                op2 = False
            ns += '{'
            ns, s, i, op1, op2 = recursive_bracket_parser(ns, s, i + 1, op1, op2)
        elif s[i] == '}':
            if i != 0 and i != len(s) - 1:
                if s[i - 1] != '}' and s[i - 1] != '{':
                    ns += '"'
            ns += '}'

            return ns, s, i + 1, op1, op2
        else:
            l = s[i]
            if l == '#':
                break
            elif l != '"' and l != ':' and l != ' ' and l != '|' and l != '\t' and l != '\n' and l != ',':
                if i != 0 and i != len(s) - 1:
                    if s[i - 1] == '{':
                        ns += '"'
                    elif s[i - 1] == '}':
                        ns += ',"'

                ns += l
            elif l == ':' and i != 0 and i != len(s) - 1:
                if s[i - 1] != '}':
                    ns += '"'
                elif s[i - 1] != ',':
                    ns += ','
                ns += ':'
                if s[i + 1] != '{':
                    ns += '"'
                op1 = True
            elif l == ' ' and op1 and i != 0 and i != len(s) - 1:
                if s[i - 1] != '}' and s[i - 1] != '{':
                    ns += '"'
                ns += ','
                if s[i + 1] != '}' and s[i + 1] != '{':
                    ns += '"'
                op2 = True
                op1 = False

            i += 1
    #print (ns)
    return ns, s, i, op1, op2


#print (rawLines)
rawLines = rawLines.replace(' }', '}')
rawLines = rawLines.replace('  }', '}')

rawLines = rawLines.replace('{ ', '{')
rawLines = rawLines.replace('{  ', '{')

rawLines = rawLines.replace('} ', '}')
rawLines = rawLines.replace('}  ', '}')

rawLines = '{' + rawLines + '}'
rawLines = (recursive_bracket_parser("", rawLines, 0, False, False)[0])
rawLines = rawLines.replace(',}', '}')
rawLines = rawLines.replace('","}', '"}')

rawLines = rawLines.replace(':{', ':{"')
rawLines = rawLines.replace(':{""', ':{"')

rawLines = rawLines.replace('name', 'aName')
rawLines = rawLines.replace('id:"', '"id:"')

rawLines = rawLines.replace('{"1010"}', '"1010"')
rawLines = rawLines.replace('{"2020"}', '"2020"')

jsonText = '[{"' + typ + '":[' + rawLines + '}]}]'

try:
    #print (jsonText)
    jsonText = jsonText.replace('}]}]', ']}]')
    jsonText = jsonText.replace('[{{', '[{')
    jsonText = jsonText.replace('}{', '},{')
    jsonText = jsonText.replace('}id', '},{"id')
    jsonText = jsonText.replace('{id', '{"id')
    jsonText = jsonText.replace('""id', '"id')
    #jsonText = jsonText.replace('},"id', '}{"id')

    #print (jsonText)
    fd = open(file.replace('.txt', '.log'), 'w')
    fd.write(jsonText)
    fd.close()

    json_data = json.loads(jsonText)

    json_string = json.dumps(json_data, sort_keys=False, indent=2)
    #print(json_string)
    dates = {}
    n = 0
    character = json_data[0]["characters"]
    for i in range(0, len(character)):
        dates = {}
        for key in json_data[0]['characters'][i]:
            if (is_date(key)):
                dates[key] = [character[i][key]]
            print(key)
            print(character[i][key])
        json_data[0]['characters'][i]['dates'] = dates
        for item in dates:
            json_data[0]['characters'][i].pop(item, None)



    #print(json_data)
    print('Saved as: ' + file.replace('.txt', '.json'))
    jsonText = json.dumps(json_data, sort_keys=False, indent=2)
    fd = open(file.replace('.txt', '.json'), 'w')
    fd.write(jsonText)
    fd.close()
except ValueError as e:
    print("Error at: ", e)
#print(json.dumps(jsonText).replace('\\', ''))

#d = defaultdict(a)
