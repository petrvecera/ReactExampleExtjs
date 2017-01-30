import requests
import json
import re
import os


def basta():
    r = requests.get('http://www.pustkoveckabasta.cz/denni-menu/')

    html = r.text

    html = html[html.find("<h1>Denní menu</h1>"):html.find('<div id="clear"></div>')]
    ar = html.split('<div class="list">')

    ar = ar[1:]
    all_days = []

    def work_one_day(work):
        work = work.replace('<div class="list-col-4">', "")
        work = work.replace('<div class="list-item">', "")
        work = work.replace('</div>', "")
        work = work.replace('<div class="title">', "")
        work = work.replace('<div class="clear">', "")
        work = work.split("\n")
        f = []
        for x in work:
            z = x.strip()
            if len(z):
                f.append(' '.join(z.split()))

        data = {}
        data["day"] = f[0]
        data["soup"] = f[1]
        data["meals"] = f[2:]

        nl_meals = []
        for x in data["meals"]:
            nl_meals.append([x])

        data["meals"] = nl_meals

        all_days.append(data)

    for x in ar:
        work_one_day(x)

    final = {}
    final["days"] = all_days

    with open('basta.json', 'w', encoding='utf8') as json_file:
        data = json.dumps(final, indent=2, ensure_ascii=False)
        json_file.write(data)


def jarosi():
    r = requests.get('http://www.ujarosu.cz/cz/denni-menu/')
    r.encoding = 'utf-8'
    html = r.text

    ft = html.find("<tbody")
    html = html[ft + 10:]
    html = html[:html.find("</table")]
    # html = html[html.find("tbody")+7:]

    with open('hovno.txt', 'w', encoding='utf8') as myfile:
        myfile.write(html)

    html = html.replace("<td>", "")
    html = html.replace("</td>", "")
    html = html.replace("&#160;", "")
    html = re.sub(r"<td.*>", "", html)
    html = re.sub(r"<tr.*>", "", html)
    html = html.replace("</tbody>", "")

    print("FUUU")
    print(html)

    days = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek"]

    days_html = []

    days_html.append(html[html.find(days[0]):html.find(days[1])])
    days_html.append(html[html.find(days[1]):html.find(days[2])])
    days_html.append(html[html.find(days[2]):html.find(days[3])])
    days_html.append(html[html.find(days[3]):html.find(days[4])])
    days_html.append(html[html.find(days[4]):])

    all_days_processed = []

    def work_one_day(day):

        meals = day.split("</tr>")
        new_meals = []
        for x in meals:
            z = ' '.join(x.split())
            # print("|{}|".format(z))
            if z:
                new_meals.append(z)

        d = new_meals[0].split(":")
        data = {}
        data["day"] = d[0]
        data["soup"] = d[1]
        new_meals = new_meals[1:]
        processed_meals = []
        if not new_meals[0][0].isdigit():
            data["soup"] = data["soup"] + " - " + new_meals[0]

        for x in new_meals:
            if x[0].isdigit():
                processed_meals.append(x)
        data["meals"] = processed_meals
        all_days_processed.append(data)

    for x in days_html:
        work_one_day(x)

    final = {}
    final["days"] = all_days_processed

    with open('jarosi.json', 'w', encoding='utf8') as json_file:
        data = json.dumps(final, indent=2, ensure_ascii=False)
        json_file.write(data)


def removeFile(file):
    try:
        os.remove(file)
    except Exception as e:
        pass


# To ensure no old data are present if the script fails
removeFile('basta.json')
removeFile('jarosi.json')

try:
    pass
    #jarosi()
except Exception as e:
    print(e)

try:
    basta()
except Exception as e:
    print(e)
