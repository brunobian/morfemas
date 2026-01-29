#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pandas as pd 
import csv

sust_comunes = pd.read_csv('../data/Sustantivos_filtrados.csv')
sust_comunes = sust_comunes[sust_comunes.frecuencia != 0]

sufijos_derivativos = pd.read_csv('../data/sufijos_derivativos_sustantivos.csv')

lista = list(sufijos_derivativos['singular'])
lista.sort(key=len, reverse=True)

objetivo = 'expertos'

if objetivo == 'estudiantes':
    nListas = 5
    lista = lista[:-3] #Esto es para correr sin flexivos (a, o ,e)
elif objetivo == 'expertos':
    nListas = 10

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
    ind = sufijos_derivativos['singular'] == suf 
    suf_plur = sufijos_derivativos['plural'][ind]

    filt_plur   = filter(lambda x: suf_plur.values[0] in x[-len(suf_plur):], 
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


# Guardado nuevo

longitudes  = sorted([len(filtroTodas[x]) for x in filtroTodas], reverse=True)
indexSorted = sorted(filtroTodas, key=lambda k: len(filtroTodas[k]), reverse=True)

nfiles = 0
npals = 0
cantPalsMorfema = 15


listasGuardadas = []
while sum(longitudes) > 0:
    print(nfiles)
    outfilename = 'para_' + objetivo + '/' + str(nfiles) + '.xls'     
    # f = open(outfilename, 'wb')
    # f.write('')

    df = pd.DataFrame({'p' : [],'s' : []})
    guardadas = []

    for i in range(nListas):
        if len(indexSorted)> i:
            sufijo = indexSorted[i]

            if len(filtroTodas[sufijo]) > cantPalsMorfema:
                pals = filtroTodas[sufijo][0:cantPalsMorfema]
            else:
                pals = filtroTodas[sufijo][0:]

            Pals = ['']  + pals
            sufs = [sufijo]*len(Pals)
            tmp = pd.DataFrame({'p':Pals, 's':sufs})
            df = pd.concat([df, tmp])

            # guardo_new(pals, sufijo, outfilename)
            # tosave = addPals(pals, sufijo)

            guardadas += pals

            # Ahora que ya guardé, las elimino
            for x in pals:
                filtroTodas[sufijo].remove(x)
    

    writer = pd.ExcelWriter(outfilename)
    df.to_excel(writer,'Sheet1')
    writer.save()
    
    # Elimino sufijos me quedan vacíos
    filtroTodas = {k: v for k, v in filtroTodas.items() if len(v)>0}
    longitudes  = sorted([len(filtroTodas[x]) for x in filtroTodas], reverse=True)
    indexSorted = sorted(filtroTodas, key=lambda k: len(filtroTodas[k]), reverse=True)
    nfiles += 1

    listasGuardadas.append(guardadas)

longitudesListas  = sorted([len(x) for x in listasGuardadas], reverse=True)
umbral = cantPalsMorfema*nListas*.3
sum([x<umbral for x in longitudesListas])











############### OLD ############################3

# # Guardo todo junto
# outfilename = 'todo.csv'     
# numero = ['singular', 'plural']
# f = open(outfilename, 'wb')
# f.write('')
# npals = 0
# for sufijo in filtro:
#     guardo(filtro, sufijo, numero, outfilename, npals)




# ## Guardado viejo, con cantidad minima de palabras por lista
# # Guardo para estudiantes (listas de ~50)
# npals = 0
# nfiles = 0
# outfilename = 'para_estudiantes/' + str(nfiles) + '.csv'     
# numero = ['singular', 'plural']
# f = open(outfilename, 'wb')
# f.write('')
# for sufijo in filtro:
#     if npals >= 50:
#         npals = 0
#         nfiles = nfiles + 1
#         outfilename = 'para_estudiantes/' + str(nfiles) + '.csv'  

#     npals = guardo(filtro, sufijo, numero, outfilename, npals)




# ## Guardado viejo, con cantidad minima de palabras por lista
# # Guardo para estudiantes (listas de ~50)
# npals = 0
# nfiles = 0
# outfilename = 'para_estudiantes/' + str(nfiles) + '.csv'     
# numero = ['singular', 'plural']
# f = open(outfilename, 'wb')
# f.write('')
# for sufijo in filtro:
#     if npals >= 50:
#         npals = 0
#         nfiles = nfiles + 1
#         outfilename = 'para_estudiantes/' + str(nfiles) + '.csv'  

#     npals = guardo(filtro, sufijo, numero, outfilename, npals)

# # Guardo para expertos (listas de ~300)
# npals = 0
# nfiles = 0
# outfilename = 'para_expertos/' + str(nfiles) + '.csv'     
# numero = ['singular', 'plural']
# f = open(outfilename, 'wb')
# f.write('')
# for sufijo in filtro:
#     if npals >= 300:
#         npals = 0
#         nfiles = nfiles + 1
#         outfilename = 'para_expertos/' + str(nfiles) + '.csv'  

#     npals = guardo(filtro, sufijo, numero, outfilename, npals)



# from xlutils.copy import copy
# from xlrd import *

# def writeXls():
#     w = copy(open_workbook('book1.xls'))
#     w.get_sheet(0).write(0,0,"foo")
#     w.save('book2.xls')

# def addPals(pals, sufijo):
#     pals = '' + pals
#     tosave = 1

# def guardo(filtro, sufijo, numero, outfilename, npals):
#     for n,lista in enumerate(filtro[sufijo]):
#         if lista:
#             string = numero[n] + ' ; ' + sufijo + ' ; ' '\n'
#             f = open(outfilename, 'a')
#             f.write(string)
#             for pal in lista:
#                 npals  = npals + 1          
#                 string = numero[n] + ' ; ' + sufijo + ' ; ' + pal + '\n'

#                 f = open(outfilename, 'a')
#                 f.write(string)

#     return npals

# def guardo_new(pals, sufijo, outfilename):
#     string = sufijo + ' ; ' '\n'
#     f = open(outfilename, 'a')
#     f.write(string)

#     for n,pal in enumerate(pals):
#         string = sufijo + ' ; ' + pal + '\n'
#         f = open(outfilename, 'a')
#         f.write(string)
