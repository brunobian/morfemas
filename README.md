# INTRO

Este repo tiene todo lo necesario para la generación de las listas de palabras divididas en morfemas

## Generación inicial de listas de palabras

- La idea inicial de esto fue tomar todos los sustantivos en español de una base de datos (lexEsp en data/palstruct.mat) para separarlos segun su terminación. 
- La lista de sustantivos comunes con su frecuencia está en data/Sustantivos_filtrados.csv. 
- Para llegar a este csv se usan los códigos que están en scripts/matlab
- Para esto se hizo un listado de todos los posibles sufijos derivativos del español. En los archivos .xls de data/ se encuentran los pasos intermedios en los que se fueron anotando detalles. El archivo final de sufijos es data/sufijos_derivativos_sustantivos.csv
- Con estos sufijos se corrió un script que separar las palabras en base al sufijo más largo posible según su terminación
- Se exporta la lista generada en data/pals_por_sufijo_SinChequear.csv
- Esta separación de palabras por su posible sufijo tiene que ser chequeada a mano

## Chequeo a mano

- Expertos chequeron palabra por palabra si el morfema asignado es correcto o no
- En data/pals_por_sufijo_chequeo_manual.csv está la información. La columna R indica si la palabra está afijada o no, con ese sufijo
- La información del chequeo manual se carga desde scripts/cargar_chequeo_maual.py
- Este código separa las afijadas de la pseudoafijadas, carga la frecuencia de LexEsp y calcula frecuencias y conteos por sufijo
- La salida termina en data/frecuencias_por_sufijo.csv

## Corrección por alomorfos

- falta revisar que esto lo estemos teniendo en cuenta
- En principio la lista de sufijos usada incluye a los alomorfos
- lo que hay que ver es que el archivo con la curación hecha por los expertos lo tenga en cuenta

