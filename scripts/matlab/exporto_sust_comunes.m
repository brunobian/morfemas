%% Busco sustantivos comunes

% Quiero exportar los sustantivos
load ../../data/palstruct.mat
palabras = palstruct;
palabras_edit = palabras;
clear palstruct

% Elimino las no-palabas (todo lo que tiene numeros y guiones
% De paso uso el for para taggear sustantivos
isalpha = isstrprop({palabras.palabra},'alpha');

SonPals = [];
SonSustCom = [];
for i = 1:length(isalpha)
    if mod(i,10000)==0
        disp(['Van ' num2str(i) ' de ' num2str(length(isalpha))])
    end
    
    if isempty(find(isalpha{i}==0)) % Si no hay ningun cero
        SonPals = [SonPals i];

        CatNoSust = [];
        for indCat = 1:length(palabras(i).categorias)
            EstaCat = palabras(i).categorias(indCat).categoria;
            if strcmp(EstaCat(1),'n') & strcmp(EstaCat(2),'c')
                SonSustCom = [SonSustCom i];
            else
                CatNoSust = [CatNoSust indCat];
            end
        end
        palabras_edit(i).categorias(CatNoSust) = []; 
    end
end

PalabrasPosta = palabras(SonPals);
SustantivosComunes = palabras_edit(SonSustCom);

disp(['De las ' num2str(length(isalpha)) ' entradas de LexEsp me quedé con ' num2str(length(SonPals)) ' palabras (sin caracteres raros)'])
disp(['De las ' num2str(length(isalpha)) ' entradas de LexEsp me quedé con ' num2str(length(SonSustCom)) ' sustantivos Comunes'])

% SustantivosComunes solo me deja palabras con al menos una categoria n
% Ademas le elimino las categorias que no son n
% Pero no me interesan las diferentes acepciones, me interesa la frecuencia
% acumulada

pals = {SustantivosComunes.palabra}';
frecs = [SustantivosComunes.frec]';

para_exportar = {'palabra,frecuencia'};
for i=1:length(pals)
    % el header ocupa el lugar 1, le sumo 1 a i
    para_exportar{i+1} = strcat(pals{i}, ',', num2str(frecs(i)));
end

cell2csv('../../data/sust_comunes.csv', para_exportar')
