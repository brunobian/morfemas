#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pandas as pd 
import csv

def guardo(filtro, sufijo, numero, outfilename, npals):
    for n,lista in enumerate(filtro[sufijo]):
        if lista:
            string = numero[n] + ' ; ' + sufijo + ' ; ' '\n'
            f = open(outfilename, 'a')
            f.write(string)
            for pal in lista:
                npals  = npals + 1          
                string = numero[n] + ' ; ' + sufijo + ' ; ' + pal + '\n'

                f = open(outfilename, 'a')
                f.write(string)

    return npals

def guardo_new(pals, sufijo, outfilename):
    string = sufijo + ' ; ' '\n'
    f = open(outfilename, 'a')
    f.write(string)

    for n,pal in enumerate(pals):
        string = sufijo + ' ; ' + pal + '\n'
        f = open(outfilename, 'a')
        f.write(string)


sust_comunes = pd.read_csv('../data/sust_comunes.csv')
sufijos_derivativos = pd.read_csv('../data/sufijos_derivativos_sustantivos.csv')

lista = list(sufijos_derivativos['derivativos'])
lista.sort(key=len, reverse=True)

lista = lista[:-3] #Esto es para correr sin flexivos (a, o ,e)

filtradas = []
filtro = {}
filtroTodas = {}
for suf in lista:
    raices = []
    filtro[suf] = []
    filtroTodas[suf] = []
    # Singulares
    filt_sing   = filter(lambda x: suf in x[-len(suf):], 
                                 sust_comunes['palabra'].values)
    #split_sing  = [x[:-len(suf)] + '-' + x[-len(suf):] for x in filt_sing]
    filt_sing_nuevas = [x for x in filt_sing if x not in filtradas]
    filtro[suf].append(filt_sing_nuevas)
    filtradas  += filt_sing_nuevas


    # Plurales
    if suf[-1] in ['a','e','i','o','u']: # Si el sufijo termina en vocal, va una s
        suf_plur =  suf + 's'
    elif suf[-1] == 'z':                 # actriz -> actrices
        suf_plur = suf[:-1] + 'ces'      
    elif suf[-1] in ['d', 'l', 'r']:     # edad -> edades
        suf_plur = suf + 'es'            
    elif len(suf) < 3:
        filtro[suf].append([])
        print suf
        continue
    elif suf[-4:] == 'amen':              
        suf_plur = suf + 'es'
    elif suf[-3:] == 'ón':                # canción -> canciones
        suf_plur = suf[:-3] + 'ones'
    elif suf[-3:] == 'ín':                # bailarín -> bailarines
        suf_plur = suf[:-3] + 'ines' 
    elif suf[-3:] == 'án':                # capitán -> capitanes
        suf_plur = suf[:-3] + 'anes'     
    else:
        filtro[suf].append([])
        print 'sufijo sin plural ' + suf
        continue

    filt_plur   = filter(lambda x: suf_plur in x[-len(suf_plur):], 
                                  sust_comunes['palabra'].values)
    #split_plur  = [x[:-len(suf_plur)] + '-' + x[-len(suf_plur):] for x in filt_plur]
    filt_plur_nuevas = [x for x in filt_plur if x not in filtradas]

    # Antes de guardar las plurales, elimino las que ya guardamos como sing
    # Para esto, busco raices iguales
    raices_sing = [x[:-len(suf)] for x in  filt_sing_nuevas]
    raices_plur = [x[:-len(suf_plur)] for x in  filt_plur_nuevas]
    filt_raiz   = filter(lambda x: x not in raices_sing, raices_plur)
    filt_plur_nuevas = [x+suf_plur for x in filt_raiz]

    filtro[suf].append(filt_plur_nuevas)
    filtradas += filt_plur_nuevas

    filtroTodas[suf] = filt_sing_nuevas + filt_plur_nuevas    



longitudes  = sorted([len(filtroTodas[x]) for x in filtroTodas], reverse=True)
indexSorted = sorted(filtroTodas, key=lambda k: len(filtroTodas[k]), reverse=True)

nfiles = 0
npals = 0
cantPalsMorfema = 15
objetivo = 'estudiantes'
if objetivo == 'estudiantes':
    nListas = 5
elif objetivo == 'expertos':
    nListas = 10

listasGuardadas = []
while sum(longitudes) > 0:
    outfilename = 'para_' + objetivo + '_new/' + str(nfiles) + '.csv'     
    f = open(outfilename, 'wb')
    f.write('')

    guardadas = []
    for i in range(nListas):

        sufijo = indexSorted[i]



        if len(filtroTodas[sufijo]) > cantPalsMorfema:
            pals = filtroTodas[sufijo][0:cantPalsMorfema]
        else:
            pals = filtroTodas[sufijo][0:]

        guardo_new(pals, sufijo, outfilename)

        guardadas += pals

        # Ahora que ya guardé, las elimino
        for x in pals:
            filtroTodas[sufijo].remove(x)
    
    # Elimino sufijos me quedan vacíos
    filtroTodas = {k: v for k, v in filtroTodas.items() if len(v)>0}
    longitudes  = sorted([len(filtroTodas[x]) for x in filtroTodas], reverse=True)
    indexSorted = sorted(filtroTodas, key=lambda k: len(filtroTodas[k]), reverse=True)
    nfiles += 1

    listasGuardadas.append(guardadas)

longitudesListas  = sorted([len(x) for x in listasGuardadas], reverse=True)
sum([x<20 for x in longitudesListas])




# Guardo todo junto
outfilename = 'todo.csv'     
numero = ['singular', 'plural']
f = open(outfilename, 'wb')
f.write('')
npals = 0
for sufijo in filtro:
    guardo(filtro, sufijo, numero, outfilename, npals)




## Guardado viejo, con cantidad minima de palabras por lista
# Guardo para estudiantes (listas de ~50)
npals = 0
nfiles = 0
outfilename = 'para_estudiantes/' + str(nfiles) + '.csv'     
numero = ['singular', 'plural']
f = open(outfilename, 'wb')
f.write('')
for sufijo in filtro:
    if npals >= 50:
        npals = 0
        nfiles = nfiles + 1
        outfilename = 'para_estudiantes/' + str(nfiles) + '.csv'  

    npals = guardo(filtro, sufijo, numero, outfilename, npals)




## Guardado viejo, con cantidad minima de palabras por lista
# Guardo para estudiantes (listas de ~50)
npals = 0
nfiles = 0
outfilename = 'para_estudiantes/' + str(nfiles) + '.csv'     
numero = ['singular', 'plural']
f = open(outfilename, 'wb')
f.write('')
for sufijo in filtro:
    if npals >= 50:
        npals = 0
        nfiles = nfiles + 1
        outfilename = 'para_estudiantes/' + str(nfiles) + '.csv'  

    npals = guardo(filtro, sufijo, numero, outfilename, npals)

# Guardo para expertos (listas de ~300)
npals = 0
nfiles = 0
outfilename = 'para_expertos/' + str(nfiles) + '.csv'     
numero = ['singular', 'plural']
f = open(outfilename, 'wb')
f.write('')
for sufijo in filtro:
    if npals >= 300:
        npals = 0
        nfiles = nfiles + 1
        outfilename = 'para_expertos/' + str(nfiles) + '.csv'  

    npals = guardo(filtro, sufijo, numero, outfilename, npals)



