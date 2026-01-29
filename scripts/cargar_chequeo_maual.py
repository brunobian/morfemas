import pandas as pd

data  = pd.read_csv('data/pals_por_sufijo_chequeo_manual.csv')
frecs = pd.read_csv('data/todas_pals_con_freq.csv')

data_si = data[data['R'] == 'sí']
data_no = data[data['R'] == 'no']

# AFIJADAS
df = data_si.merge(frecs, how='left', on = 'Palabra')
df.drop(["R","Palabra"],axis=1,inplace=True)

# frec afijadas
frec_numero_afij = df.groupby(['Sufijo', 'Número']).agg('sum')
frec_numero_afij.rename(columns={'frecuencia':'frec_afijada'}, inplace=True)

frec_total_afij  = df.groupby(['Sufijo']).agg('sum')
frec_total_afij.rename(columns={'frecuencia':'frec_afijada'}, inplace=True)
frec_total_afij['Número'] = 'Total'
frec_total_afij.set_index('Número')

# count afijadas
count_numero_afij = df.groupby(['Sufijo', 'Número']).agg('count')
count_numero_afij.rename(columns={'frecuencia':'count_afijada'}, inplace=True)

count_total_afij  = df.groupby(['Sufijo']).agg('count')
count_total_afij.rename(columns={'frecuencia':'count_afijada'}, inplace=True)
count_total_afij['Número'] = 'Total'
count_total_afij.set_index('Número')


# PSEUDOAFIJADAS
df = data_no.merge(frecs, how='left', on = 'Palabra')
df.drop(["R","Palabra"],axis=1,inplace=True)

# frec pseudoafijadas
frec_numero_pseudo = df.groupby(['Sufijo', 'Número']).agg('sum')
frec_numero_pseudo.rename(columns={'frecuencia':'frec_pseudoafijada'}, inplace=True)

frec_total_pseudo  = df.groupby(['Sufijo']).agg('sum')
frec_total_pseudo.rename(columns={'frecuencia':'frec_pseudoafijada'}, inplace=True)
frec_total_pseudo['Número'] = 'Total'
frec_total_pseudo.set_index('Número')

# count pseudoafijadas
count_numero_pseudo = df.groupby(['Sufijo', 'Número']).agg('count')
count_numero_pseudo.rename(columns={'frecuencia':'count_pseudoafijada'}, inplace=True)

count_total_pseudo  = df.groupby(['Sufijo']).agg('count')
count_total_pseudo.rename(columns={'frecuencia':'count_pseudoafijada'}, inplace=True)
count_total_pseudo['Número'] = 'Total'
count_total_pseudo.set_index('Número')

# MERGES
fa = frec_numero_afij.merge(frec_total_afij, how = 'outer', on = ['Sufijo','Número'])
fa['frec_afijada'] = fa.fillna(0)['frec_afijada_x'] + fa.fillna(0)['frec_afijada_y']
fa.drop(['frec_afijada_x', 'frec_afijada_y'], axis=1, inplace=True)

fp = frec_numero_pseudo.merge(frec_total_pseudo, how = 'outer', on = ['Sufijo','Número'])
fp['frec_pseudoafijada'] = fp.fillna(0)['frec_pseudoafijada_x'] + fp.fillna(0)['frec_pseudoafijada_y']
fp.drop(['frec_pseudoafijada_x', 'frec_pseudoafijada_y'], axis=1, inplace=True)

ca = count_numero_afij.merge(count_total_afij, how = 'outer', on = ['Sufijo','Número'])
ca['count_afijada'] = ca.fillna(0)['count_afijada_x'] + ca.fillna(0)['count_afijada_y']
ca.drop(['count_afijada_x', 'count_afijada_y'], axis=1, inplace=True)

cp = count_numero_pseudo.merge(count_total_pseudo, how = 'outer', on = ['Sufijo','Número'])
cp['count_pseudoafijada'] = cp.fillna(0)['count_pseudoafijada_x'] + cp.fillna(0)['count_pseudoafijada_y']
cp.drop(['count_pseudoafijada_x', 'count_pseudoafijada_y'], axis=1, inplace=True)

todo = fa.merge(fp, how = 'outer', on = ['Sufijo','Número'])
todo = todo.merge(ca, how = 'outer', on = ['Sufijo','Número'])
todo = todo.merge(cp, how = 'outer', on = ['Sufijo','Número'])

# Proporciones
todo = todo.fillna(0)

todo['prop_frec_afij'] = todo['frec_afijada'] / (todo['frec_pseudoafijada']+todo['frec_afijada'])
todo['prop_count_afij'] = todo['count_afijada'] / (todo['count_pseudoafijada']+todo['count_afijada'])

todo.sort_values(['Sufijo', 'Número'], inplace=True)
todo.to_csv('data/frecuencias_por_sufijo.csv')



