from typing import List, Any

import errno
import json
import os
import re

import requests
from pyquery import PyQuery

# This python script is used for scrapping all "Jeux de societe" from www.philibertnet.com

url = 'https://www.philibertnet.com/fr/50-jeux-de-societe?id_category=50&n=36&p='
games = []  # type: List[Any]

cache_dir = ".cache/"
try:
    os.makedirs(cache_dir)
except OSError as e:
    if e.errno != errno.EEXIST:
        raise


def get_detail(pq_detail):
    script = pq_detail('script')
    data_layer = script[0].text.split('\n')[2]
    data_layer = re.sub(r"^dataLayer.push\(", "", data_layer)
    data_layer = re.sub(r"\);$", "", data_layer)

    j = json.loads(data_layer)
    return j['ecommerce']['detail']['products'][0]


def get_pictures_link(pq_pic):
    result = []
    thumbs = pq_pic('[id*=thumbnail]')
    for t in thumbs:
        thickbox = t.find('a').attrib['href']
        large = re.sub(r"thickbox", "large", thickbox)
        small = re.sub(r"thickbox", "small", thickbox)
        result.append({
            'thickbox': thickbox,
            'large': large,
            'small': small,
        })
    return {'pics': result}


def get_description(pq_fr, pq_en):
    result = {
        'fr': None,
        'en': None,
    }

    rte = pq_fr('#tab-description>.rte')
    if rte.length > 0:
        result["fr"] = rte[-1].text_content()

    rte = pq_en('#tab-description>.rte')
    if rte.length > 0:
        result["en"] = rte[-1].text_content()

    return {'descriptions': result}


def get_caracteristic(pq_fr):
    result = {
        'theme': None,
        'language': None,
        'mecanisms': None,
        'authors': None,
        'editor': None,
        'extension': None,

        'age': None,
        'nb_players': None,
        'duration': None,
    }

    table = pq_fr('#tab-features.page-product-box>table.table-data-sheet')
    # table = pq_fr('#tab-features.page-product-box')
    for tr in table.children():
        tr_child = tr.getchildren()
        char_type = tr_child[0].text_content().strip()
        contents = tr_child[2].findall('a')
        field = []  # prevent error...
        if char_type == "Thème(s)":
            field = result["theme"] = []
        elif char_type == "Langue(s)":
            field = result["language"] = []
        elif char_type == "Mécanisme(s)":
            field = result["mecanisms"] = []
        elif char_type == "Auteur(s)":
            field = result["authors"] = []
        elif char_type == "Éditeur":
            field = result["editor"] = []
        elif char_type == "Extension pour":
            field = result["extension"] = []

        for content in contents:
            field.append(content.text_content().strip())

    age_query = pq_fr('.age.tooltips')
    if age_query.length > 0:
        result["age"] = get_age_range(age_query[-1].text_content())

    nb_players_query = pq_fr('.nb_joueurs.tooltips')
    if nb_players_query.length > 0:
        result["nb_players"] = get_nb_players_range(nb_players_query[-1].text_content())

    duration_query = pq_fr('.duree_partie.tooltips')
    if duration_query.length > 0:
        result["duration"] = get_game_duration(duration_query[-1].text_content())

    return {"caracteristic": result}


def get_age_range(pattern):
    pattern = pattern.strip()
    return {'min': int(re.findall(r"\d+", pattern)[0]), 'max': None}


def get_nb_players_range(pattern):
    pattern = pattern.strip()
    res = re.findall(r"\d+", pattern)
    min_pl = int(res[0])
    if res.__len__() > 1:
        max_pl = int(res[1])
    else:
        max_pl = None
    return {'min': min_pl, 'max': max_pl}


def get_game_duration(pattern):
    pattern = pattern.strip()
    min = None
    max = None
    if re.match('^moins', pattern):
        res = re.findall(r"\d+", pattern)[0]
        max = int(res)
    elif re.match('et plus$', pattern):
        res = re.findall(r"\d+", pattern)[0]
        min = int(res) * 60
    else:  # FIXME : DEGUEU
        res = re.findall(r"\d+", pattern)
        if re.search('mn', pattern):  # if the value is minutes
            min = int(res[0])
        else:                         # else it's in hour, so we multiply 60
            min = int(res[0]) * 60
        if res.__len__() > 1:
            max = int(res[1]) * 60    # the second value is always hour
    return {'min': min, 'max': max}


def get_contents(pq_fr):
    ul = pq_fr('section#tab-content>.rte>ul')
    return {'contents': [li.text_content().strip() for li in ul.children()]}


def get_game_info(link_pq):
    url_fr = link_pq.attrib['href']
    url_en = re.sub(r"/fr/", "/en/", url_fr)

    pq_fr = get_html(url_fr)  # type: PyQuery
    pq_en = get_html(url_en)

    detail = get_detail(pq_fr)
    pics = get_pictures_link(pq_fr)
    descriptions = get_description(pq_fr, pq_en)
    caract = get_caracteristic(pq_fr)
    contents = get_contents(pq_fr)

    game = {**detail, **pics, **descriptions, **caract, **contents}

    game["url_fr"] = url_fr
    game["url_en"] = url_en
    games.append(game)


def get_html(url):
    r_url = url
    r_url = re.sub(r"/", "_", r_url)
    r_url = re.sub(r":", "_", r_url)
    file = cache_dir + r_url
    if os.path.isfile(file):
        print('cache pour ' + str(url))
        with open(file, "r") as f:
            r = f.read()
            return PyQuery(r)
    else:
        print('no cache pour ' + str(url))
        r = requests.get(url)
        with open(file, 'wb') as f:
            for block in r.iter_content(1024):
                f.write(block)
        return PyQuery(r.text)


if __name__ == "__main__":

    for i in range(1, 246):
        print("PAGE " + str(i))
        pq = get_html(url + str(i))
        l_games = pq('.s_title_block>a')
        for g in l_games:
            get_game_info(g)
    with open('games.json', 'w') as outfile:
        json.dump(games, outfile, indent=4, ensure_ascii=False)
