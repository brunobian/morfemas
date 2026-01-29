 var shuffleSequence = seq("intro", sepWith("sep", seq("practice", "message", rshuffle("critems", "eeg", "critems1", "filler", "fillerY", "fillerN"))));
var practiceItemTypes = ["practice"];
var showProgressBar = false;
var sendingResultsMessage = "Enviando resultados al servidor. No cierres esta página. ¡Gracias!";
var completionMessage = "¡Listo! Muchas gracias por participar.";

var equalGroupSizes = false;
var defaults = [
 
    "Separator", {
        transfer: 1000,
        normalMessage: "Esperá la próxima oración.",
        errorMessage: "Oops. Te equivocaste."
    },
    
    "AcceptabilityJudgment", {
        as: ["1", "2", "3", "4", "5"],
        presentAsScale: true,
        instructions: "Usá los números y letras del teclado para dar tu respuesta.",
        leftComment: "(Horrible)", rightComment: "(Perfecta)"
    
    },
    "Question", {
        hasCorrect: true
    },
    "Message", {
        hideProgressBar: true,
        requiresConsent: true,    
    },
    "Form", {
        hideProgressBar: true,
        continueOnReturn: true
    },
     "FlashSentence",{
         timeout: 5000
    }
    
];

var items = [

    // New in Ibex 0.3-beta-9. You can now add a '__SendResults__' controller in your shuffle
    // sequence to send results before the experiment has finished. This is NOT intended to allow
    // for incremental sending of results -- you should send results exactly once per experiment.
    // However, it does permit additional messages to be displayed to participants once the
    // experiment itself is over. If you are manually inserting a '__SendResults__' controller into
    // the shuffle sequence, you must set the 'manualSendResults' configuration variable to 'true', since
    // otherwise, results are automatically sent at the end of the experiment.
    //
    //["sr", "__SendResults__", { }],

    ["sep", "Separator", { }],

    // NOTE: You could also use the 'Message' controller for the experiment intro (this provides a simple
    // consent checkbox).
    ["intro", "Form", {
        html: { include: "example_intro.html" },
        validators: {
            edad: function (s) { if (s.match(/^\d+$/)) return true; else return "Valor incorrecto para \u2018edad\u2019"; }
        },
        continueMessage: "Hacé click aquí para continuar."
    } ],
    //
    // Three practice items for self-paced reading (one with a comprehension question).
    //
    ["practice", "AcceptabilityJudgment", {s: "Los estudiantes salieron de la escuela por la tarde. Esta es una oración que suene perfectamente. Presioná la opción 5 para indicar que es Perfectamente aceptable."},
     "Question",                         {q:"¿Los estudiantes salieron de la escuela por la mañana?", as: ["No", "Sí"]}],
    ["practice", "AcceptabilityJudgment", {s: "Los estudiantes por la tarde salieron de la escuela. Esta es una oración aceptable, pero no tan frecuente. Presioná la opción 4 para indicar que suena Bien"}],
    ["practice", "AcceptabilityJudgment", {s: "Por la tarde salieron de la escuela los estudiantes. Esta es una oración que está bien, pero sólo la dirías en contadas ocasiones. Presioná la opción 3 para indicar que suena Regular"}],  
    ["practice", "AcceptabilityJudgment", {s: "Por la tarde de la escuela salieron los estudiantes. Esta es una oración que es posible, pero suena muy extraña. Presioná la opción 2 para indicar que suena Rara"}],
    ["practice", "AcceptabilityJudgment", {s: "Los estudiantes por la tarde de la escuela salió. Esta es una oración que además de sonar rara, no respeta la gramática del español. Presioná la opción 1 para indicar que suena Horrible"}],
     ["message", "FlashSentence", {s: "Ahora vamos a empezar."}],
    //
    // Two "real" (i.e. non-filler) self-paced reading items with corresponding acceptability judgment items.
    // There are two conditions.
    //
    [["critems", 1], "AcceptabilityJudgment", {s: "La    abuela    le    apena    a    la    bailarina    de    vestido    blanco."}],
    [["critems", 1], "AcceptabilityJudgment", {s: "A    la    bailarina    le    apena        la    abuela    de    vestido    blanco."}],
    [["critems", 1], "AcceptabilityJudgment", {s: "La    abuela    le ruega    a    la    bailarina    de vestido blanco."}],
    [["critems", 1], "AcceptabilityJudgment", {s: "A    la    bailarina    le ruega        la    abuela    de    vestido    blanco."}],

    
    
    [["critems", 2], "AcceptabilityJudgment", {s: "La    enfermera    le    atrae    al cirujano del hospital público de la ciudad. "}],
    [["critems", 2], "AcceptabilityJudgment", {s: "Al cirujano    le    atrae    la    enfermera    del hospital público de la ciudad.   "}],
    [["critems", 2], "AcceptabilityJudgment", {s: "La    enfermera    le habla    al cirujano8    del hospital público de la ciudad.   "}],
    [["critems", 2], "AcceptabilityJudgment", {s: "Al cirujano    le habla    la    enfermera   del hospital público de la ciudad.   "}],

 
    [["critems", 3], "AcceptabilityJudgment", {s: "La     directora    le   cansa    a    la    chica    del     coro    de    la    iglesia.    "}],
    [["critems", 3], "AcceptabilityJudgment", {s: "A    la    chica    le    cansa    la    directora    del     coro    de    la    iglesia.    "}],
    [["critems", 3], "AcceptabilityJudgment", {s: "La    directora    le    canta    a    la    chica    del     coro    de    la    iglesia."}],
    [["critems", 3], "AcceptabilityJudgment", {s: "A    la    chica    le canta    la    directora    del     coro    de    la    iglesia."}],
    
    
    
    [["critems", 4], "AcceptabilityJudgment", {s: "La    maestra    le    gusta    a     la    cocinera    de    la    escuela    pública."}],
    [["critems", 4], "AcceptabilityJudgment", {s: "A    la    cocinera    le    gusta        la    maestra    de    la    escuela    pública."}],
    [["critems", 4], "AcceptabilityJudgment", {s: "La    maestra    le grita   a    la    cocinera    de    la    escuela    pública."}],
    [["critems", 4], "AcceptabilityJudgment", {s: "A    la    cocinera    le grita       la    maestra    de    la    escuela    pública."}],


    [["critems", 5], "AcceptabilityJudgment", {s: "El    niño    le    repugna    a la mujer de ojos azules." }],
    [["critems", 5], "AcceptabilityJudgment", {s: "A la mujer   le    repugna        el    niño    de ojos azules."}],
    [["critems", 5], "AcceptabilityJudgment", {s: "El    niño    le susurra   a la mujer de ojos azules.    "}],
    [["critems", 5], "AcceptabilityJudgment", {s: "A la mujer    le susurra       el    niño    de ojos azules."}],
    
     
    [["critems", 6], "AcceptabilityJudgment", {s: "La     señora    le    agrada    a    la    escritora    desde    que    se    conocieron."}],
    [["critems", 6], "AcceptabilityJudgment", {s: "A    la    escritora    le    agrada        la    señora    desde    que    se    conocieron."}],
    [["critems", 6], "AcceptabilityJudgment", {s: "La    señora    le cocina    a    la    escritora    desde    que    se    conocieron."}],
    [["critems", 6], "AcceptabilityJudgment", {s: "A    la    escritora    le cocina        la    señora    desde    que    se    conocieron.    "}],
   
    
    [["critems", 7], "AcceptabilityJudgment", {s: "La    madre    le    alegra   a    la    niña    cuando la escucha cantar."}],
    [["critems", 7], "AcceptabilityJudgment", {s: "A    la    niña    le    alegra   la    madre    cuando la escucha cantar."}],
    [["critems", 7], "AcceptabilityJudgment", {s: "La    madre    le sonríe    a    la    niña    cuando la escucha cantar."}],
    [["critems", 7], "AcceptabilityJudgment", {s: "A    la    niña    le sonríe        la    madre    cuando la escucha cantar."}],
  
    
    [["critems", 8], "AcceptabilityJudgment", {s: "La    vecina    le    asusta    al cartero   del barrio del norte."}],
    [["critems", 8], "AcceptabilityJudgment", {s: "Al cartero   le    asusta        la    vecina    del barrio del norte."}],
    [["critems", 8], "AcceptabilityJudgment", {s: "La    vecina    le miente    al cartero    el barrio del norte."}],
    [["critems", 8], "AcceptabilityJudgment", {s: "Al cartero    le miente        la    vecina    el barrio del norte."}],
    
    
    [["critems", 9], "AcceptabilityJudgment", {s: "El    actor    le    asombra    a la alumna    porque    actúa    muy    bien."}],
    [["critems", 9], "AcceptabilityJudgment", {s: "A la alumna    le    asombra        el    actor    porque    actúa    muy    bien."}],
    [["critems", 9], "AcceptabilityJudgment", {s: "El    actor    le suspira    a la alumna    porque    actúa    muy    bien."}],
    [["critems", 9], "AcceptabilityJudgment", {s: "A la alumna    le suspira        el    actor    porque    actúa    muy    bien."}],
  
    
    [["critems", 10], "AcceptabilityJudgment", {s: "El    camarero    le    enferma    al    arquitecto    porque vive desesperado."}],
    [["critems", 10], "AcceptabilityJudgment", {s: "Al        arquitecto    le    enferma    el    camarero    porque vive desesperado."}],
    [["critems", 10], "AcceptabilityJudgment", {s: "El    camarero    le suplica   al    arquitecto    porque vive desesperado."}],
    [["critems", 10], "AcceptabilityJudgment", {s: "Al        arquitecto    le suplica       el    camarero    porque vive desesperado."}],
   
    
    [["critems", 11], "AcceptabilityJudgment", {s: "El     capitán    le    fascina    al        marinero    con su comida casera."}],
    [["critems", 11], "AcceptabilityJudgment", {s: "Al        marinero    le    fascina        el    capitán    con su comida casera."}],
    [["critems", 11], "AcceptabilityJudgment", {s: "El    capitán    le convida    al        marinero    con su comida casera."}],
    [["critems", 11], "AcceptabilityJudgment", {s: "Al        marinero    le convida        el    capitán    con su comida casera."}],
   
    
    [["critems", 12], "AcceptabilityJudgment", {s: "El    editor    le    importa    a la pasajera    porque es muy inteligente."}],
    [["critems", 12], "AcceptabilityJudgment", {s: "A la pasajera    le    importa        el    editor    porque es muy inteligente."}],
    [["critems", 12], "AcceptabilityJudgment", {s: "El    editor    le escribe    a la pasajera    porque es muy inteligente."}],
    [["critems", 12], "AcceptabilityJudgment", {s: "A la pasajera    le escribe       el    editor    porque es muy inteligente."}],
    
    
    [["critems", 13], "AcceptabilityJudgment", {s: "El    diputado    le    intriga    a la profesora   desde    la   primera    reunión.    "}],
    [["critems", 13], "AcceptabilityJudgment", {s: "A la profesora    le    intriga        el    diputado    desde    la    primera     reunión."}],
    [["critems", 13], "AcceptabilityJudgment", {s: "El    diputado    le insiste    a la profesora    desde    la    primera    reunión."}],
    [["critems", 13], "AcceptabilityJudgment", {s: "A la profesora    le insiste        el    diputado    desde    la   primera    reunión."}],
    
    
    [["critems", 14], "AcceptabilityJudgment", {s: "El    chofer    le    conmueve    al        empleado    de    la    empresa."}],
    [["critems", 14], "AcceptabilityJudgment", {s: "Al        empleado    le    conmueve        el    chofer    de    la    empresa."}],
    [["critems", 14], "AcceptabilityJudgment", {s: "El    chofer    le protesta    al        empleado    de    la    empresa."}],
    [["critems", 14], "AcceptabilityJudgment", {s: "Al        empleado    le protesta       el    chofer    de    la    empresa."}],
   
    
    [["critems", 15], "AcceptabilityJudgment", {s: "El    hombre    le    enoja    al        doctor    de    traje    caro."}],
    [["critems", 15], "AcceptabilityJudgment", {s: "Al        doctor    le    enoja        el    hombre    de    traje    caro."}],
    [["critems", 15], "AcceptabilityJudgment", {s: "El    hombre    le cobra    al        doctor    de    traje    caro."}],
    [["critems", 15], "AcceptabilityJudgment", {s: "Al        doctor    le cobra        el    hombre    de    traje    caro."}],

    [["critems", 16], "AcceptabilityJudgment", {s: "La    joven    le    deprime    al pintor    de    camisa    a    cuadros."}],
    [["critems", 16], "AcceptabilityJudgment", {s: "Al pintor    le    deprime        la    joven    de    camisa    a    cuadros."}],
    [["critems", 16], "AcceptabilityJudgment", {s: "La    joven    le implora    al pintor    de    camisa    a    cuadros."}],
    [["critems", 16], "AcceptabilityJudgment", {s: "Al pintor    le implora        la    joven    de    camisa    a    cuadros."}],
    
    
    [["critems", 17], "AcceptabilityJudgment", {s: "El    ladrón    le    disgusta    a la policía    que    lleva    gorro    negro."}],
    [["critems", 17], "AcceptabilityJudgment", {s: "A la policía    le    disgusta        el    ladrón    que    lleva    gorro    negro."}],
    [["critems", 17], "AcceptabilityJudgment", {s: "El    ladrón    le dispara    a la policía    que    lleva    gorro    negro."}],
    [["critems", 17], "AcceptabilityJudgment", {s: "A la policía    le dispara        el    ladrón    que    lleva    gorro    negro."}],

    [["critems", 18], "AcceptabilityJudgment", {s: "La    secretaria    le    exaspera    a    la    cantante    del     teatro    municipal."}],
    [["critems", 18], "AcceptabilityJudgment", {s: "A    la    cantante    le    exaspera        la    secretaria    del     teatro    municipal."}],
    [["critems", 18], "AcceptabilityJudgment", {s: "La    secretaria    le responde    a    la    cantante    del     teatro    municipal."}],
    [["critems", 18], "AcceptabilityJudgment", {s: "A    la    cantante    le responde        la    secretaria    del     teatro    municipal.    "}],
    
    
    [["critems", 19], "AcceptabilityJudgment", {s: "El    conductor    le    convence   al        padre    para ocupar el puesto de trabajo."}],
    [["critems", 19], "AcceptabilityJudgment", {s: "Al        padre    le    convence        el    conductor    para ocupar el puesto de trabajo."}],
    [["critems", 19], "AcceptabilityJudgment", {s: "El    conductor    le aconseja    al        padre    para ocupar el puesto de trabajo."}],
    [["critems", 19], "AcceptabilityJudgment", {s: "Al        padre    le aconseja        el    conductor    para ocupar el puesto de trabajo."}],
   
    
    [["critems", 20], "AcceptabilityJudgment", {s: "El    soldado    le    interesa    al        presidente    por    su    amor a       la    patria."}],
    [["critems", 20], "AcceptabilityJudgment", {s: "Al    presidente    le    desagrada    el    soldado    por    su    amor a     la    patria."}],
    [["critems", 20], "AcceptabilityJudgment", {s: "El    soldado    le agradece    al        presidente    por    su    amor a      la    patria."}],
    [["critems", 20], "AcceptabilityJudgment", {s: "Al        presidente    le agradece       el    soldado    por    amor a     por     la    patria."}],
   
    
    [["critems", 21], "AcceptabilityJudgment", {s: "El    veterinario    le    aburre    a la taxista    porque    dice    saber    mucho    del    tema."}],
    [["critems", 21], "AcceptabilityJudgment", {s: "A la taxista    le    aburre        el    veterinario    porque    dice    saber    mucho    del    tema."}],
    [["critems", 21], "AcceptabilityJudgment", {s: "El    veterinario    le enseña   a la taxista    porque    dice    saber    mucho    del    tema."}],
    [["critems", 21], "AcceptabilityJudgment", {s: "A la taxista    le enseña       el    veterinario    porque    dice    saber    mucho    del    tema."}],
  
    
    [["critems", 22], "AcceptabilityJudgment", {s: "La    periodista    le    divierte    al jugador    de    baja    estatura."}],
    [["critems", 22], "AcceptabilityJudgment", {s: "Al jugador    le    divierte        la    periodista    de    baja    estatura."}],
    [["critems", 22], "AcceptabilityJudgment", {s: "La    periodista    le contesta    al jugador    de    baja    estatura."}],
    [["critems", 22], "AcceptabilityJudgment", {s: "Al jugador    le contesta        la    periodista    de    baja    estatura."}],
 
    
    [["critems", 23], "AcceptabilityJudgment", {s: "La estudiante    le    harta    al jefe    cuando    hay poco trabajo."}],
    [["critems", 23], "AcceptabilityJudgment", {s: "Al jefe    le    harta        la    estudiante    cuando    hay poco trabajo."}],
    [["critems", 23], "AcceptabilityJudgment", {s: "La estudiante    le avisa    al jefe    cuando   hay poco trabajo"}],
    [["critems", 23], "AcceptabilityJudgment", {s: "Al jefe    le avisa        la    estudiante    cuando    hay poco trabajo. " }],
    
    
    [["critems", 24], "AcceptabilityJudgment", {s: "La    adolescente    le   aturde    al vendedor   con la pistola de juguete. "}],
    [["critems", 24], "AcceptabilityJudgment", {s: "Al vendedor    le    aturde        la    adolescente    con la pistola de juguete."}],
    [["critems", 24], "AcceptabilityJudgment", {s: "La    adolescente    le apunta    al vendedor    con la pistola de juguete."}],
    [["critems", 24], "AcceptabilityJudgment", {s: "Al vendedor    le apunta        la    adolescente    con la pistola de juguete."}],


 [["eeg", 1], "AcceptabilityJudgment", {s: "      María        le        encanta        a        Ana        porque         siempre        fue        muy        amable."}],
    [["eeg", 1], "AcceptabilityJudgment", {s: "A      María        le        encanta                Ana        porque         siempre        fue        muy        amable."}],
    [["eeg", 1], "AcceptabilityJudgment", {s: "  María        le        responde        a        Ana        porque         siempre        fue        muy        amable."}],
    [["eeg", 1], "AcceptabilityJudgment", {s: "A      María        le        responde                Ana        porque         siempre        fue        muy        amable."}],
  
  
    [["eeg", 2], "AcceptabilityJudgment", {s: "      Ezequiel        le        agrada        a        Laura        por         el        favor         que        le        hizo."}],
    [["eeg", 2], "AcceptabilityJudgment", {s: "A      Ezequiel        le        agrada                Laura        por         el        favor         que        le        hizo."}],
    [["eeg", 2], "AcceptabilityJudgment", {s: "      Ezequiel        le        agradece        a        Laura        por         el        favor         que        le        hizo."}],
    [["eeg", 2], "AcceptabilityJudgment", {s: "A      Ezequiel        le        agradece                Laura        por         el        favor         que        le        hizo."}],
    
    
    [["eeg", 3], "AcceptabilityJudgment", {s: "       José        le        desagrada        a        Eugenia        de         una        forma        inexplicable.     "}],
    [["eeg", 3], "AcceptabilityJudgment", {s: "A      José        le        desagrada                Eugenia        de         una        forma        inexplicable.     "}],
    [["eeg", 3], "AcceptabilityJudgment", {s: "  José        le        suplica        a        Eugenia        de         una        forma        inexplicable.    "}],
    [["eeg", 3], "AcceptabilityJudgment", {s: "A      José        le        suplica                Eugenia        de         una        forma        inexplicable.      "}],
   
    
    [["eeg", 4], "AcceptabilityJudgment", {s: "      Gastón        le        conmueve        a        Federico        siempre        que        tiene         un        buen        gesto."}],
    [["eeg", 4], "AcceptabilityJudgment", {s: "A      Gastón        le        conmueve                Federico        siempre        que        tiene         un        buen        gesto."}],
    [["eeg", 4], "AcceptabilityJudgment", {s: "Gastón      le        sonríe        a        Federico        siempre        que        tiene         un        buen        gesto."}],
    [["eeg", 4], "AcceptabilityJudgment", {s: "A      Gastón        le        sonríe                Federico        siempre        que        tiene         un        buen        gesto."}],
   
   
    [["eeg", 5], "AcceptabilityJudgment", {s: "      Carlos        le        atrae        a        Agustina        porque        es        una        mala        persona."}],
    [["eeg", 5], "AcceptabilityJudgment", {s: "A      Carlos        le        atrae                Agustina        porque        es        una        mala        persona."}],
    [["eeg", 5], "AcceptabilityJudgment", {s: "Carlos      le        roba        a        Agustina        porque        es        una        mala        persona. "}],
    [["eeg", 5], "AcceptabilityJudgment", {s: "A      Carlos        le        roba                Agustina        porque        es        una        mala        persona."}],
    
    [["eeg", 6], "AcceptabilityJudgment", {s: "      Julieta        le        fascina        a        Estela        de         manera        excesiva."}],
    [["eeg", 6], "AcceptabilityJudgment", {s: "A      Julieta        le        fascina                Estela        de         manera        excesiva."}],
    [["eeg", 6], "AcceptabilityJudgment", {s: "      Julieta        le        miente        a        Estela        de         manera        excesiva."}],
    [["eeg", 6], "AcceptabilityJudgment", {s: "A      Julieta        le        miente                Estela        de         manera        excesiva."}],
  
    
    [["eeg", 7], "AcceptabilityJudgment", {s: "      Débora        le        gusta        a        Lucía        porque        fue capaz de contradecirla."}],
    [["eeg", 7], "AcceptabilityJudgment", {s: "A      Débora        le        gusta                Lucía        porque        fue capaz de contradecirla."}],
    [["eeg", 7], "AcceptabilityJudgment", {s: "  Débora        le        grita        a        Lucía        porque    fue capaz de contradecirla."}],
    [["eeg", 7], "AcceptabilityJudgment", {s: "A      Débora        le        grita                Lucía        porque    fue capaz de contradecirla."}],
   
    
    [["eeg", 8], "AcceptabilityJudgment", {s: "      Augusto        le        impresiona        a        Luis        porque        siempre está disponible para ayudar."}],
    [["eeg", 8], "AcceptabilityJudgment", {s: "A      Augusto        le        impresiona                Luis        porque        siempre está disponible para ayudar."}],
    [["eeg", 8], "AcceptabilityJudgment", {s: "  Augusto        le        ruega        a        Luis        porque        siempre está disponible para ayudar."}],
    [["eeg", 8], "AcceptabilityJudgment", {s: "A      Augusto        le        ruega                Luis        porque        siempre está disponible para ayudar."}],
     
    
    [["eeg", 9], "AcceptabilityJudgment", {s: "      Alejandra        le        asombra        a        Teresa        porque        entró        a         robar        su        casa."}],
    [["eeg", 9], "AcceptabilityJudgment", {s: "A      Alejandra        le        asombra                Teresa        porque        entró        a         robar        su        casa."}],
    [["eeg", 9], "AcceptabilityJudgment", {s: "Alejandra      le        dispara        a        Teresa        porque        entró        a         robar        su        casa."}],
    [["eeg", 9], "AcceptabilityJudgment", {s: "A      Alejandra        le        dispara                Teresa        porque        entró        a         robar        su        casa."}],
     
    
    [["eeg", 10], "AcceptabilityJudgment", {s: "      Emilse        le        intriga        a        Brenda        porque        no        se        ven        hace        mucho."}],
    [["eeg", 10], "AcceptabilityJudgment", {s: "A      Emilse        le        intriga                Brenda        porque        no        se        ven        hace        mucho."}],
    [["eeg", 10], "AcceptabilityJudgment", {s: "      Emilse        le        escribe        a        Brenda        porque        no        se        ven        hace        mucho."}],
    [["eeg", 10], "AcceptabilityJudgment", {s: "A      Emilse        le        escribe                Brenda        porque        no        se        ven        hace        mucho."}],
     
    
    [["eeg", 11], "AcceptabilityJudgment", {s: "      Pamela        le        aburre        a        Sergio        cuando        es        pedante."}],
    [["eeg", 11], "AcceptabilityJudgment", {s: "A      Pamela        le        aburre                Sergio        cuando        es        pedante."}],
    [["eeg", 11], "AcceptabilityJudgment", {s: "Pamela      le        huye        a        Sergio        cuando        es        pedante."}],
    [["eeg", 11], "AcceptabilityJudgment", {s: "A      Pamela        le        huye                Sergio        cuando        es        pedante."}],
    
    
    [["eeg", 12], "AcceptabilityJudgment", {s: "      Leonardo        le        obsesiona        a        Mariela        desde        joven."}],
    [["eeg", 12], "AcceptabilityJudgment", {s: "A      Leonardo        le        obsesiona                Mariela        desde        joven."}],
    [["eeg", 12], "AcceptabilityJudgment", {s: "Leonardo      le        protesta        a        Mariela        desde        joven."}],
    [["eeg", 12], "AcceptabilityJudgment", {s: "A      Leonardo        le        protesta                Mariela        desde        joven."}],
   
    [["eeg", 13], "AcceptabilityJudgment", {s: "        Ana         le        deprime        a        María        sin motivo alguno. "}],
    [["eeg", 13], "AcceptabilityJudgment", {s: "A      Ana         le        deprime                María        sin motivo alguno."}],
    [["eeg", 13], "AcceptabilityJudgment", {s: "Ana       le        implora        a        María        sin motivo alguno."}],
    [["eeg", 13], "AcceptabilityJudgment", {s: "A      Ana         le        implora                María        sin motivo alguno. "}],
   
   
    [["eeg", 14], "AcceptabilityJudgment", {s: "      Gabriel        le        horroriza        a        Marcela        cuando        viene        con        tanta        hambre."}],
    [["eeg", 14], "AcceptabilityJudgment", {s: "A      Gabriel        le        horroriza                Marcela        cuando        viene        con        tanta        hambre."}],
    [["eeg", 14], "AcceptabilityJudgment", {s: "Gabriel      le        convida        a        Marcela        cuando        viene        con        tanta        hambre."}],
    [["eeg", 14], "AcceptabilityJudgment", {s: "A      Gabriel        le        convida                Marcela        cuando        viene        con        tanta        hambre."}],
     
    
    [["eeg", 15], "AcceptabilityJudgment", {s: "      Alicia        le        divierte        a        Cecilia        y        por        eso        estudian        juntas."}],
    [["eeg", 15], "AcceptabilityJudgment", {s: "A      Alicia        le        divierte                Cecilia        y        por        eso        estudian        juntas."}],
    [["eeg", 15], "AcceptabilityJudgment", {s: "  Alicia        le        cocina        a        Cecilia        y        por        eso        estudian        juntas."}],
    [["eeg", 15], "AcceptabilityJudgment", {s: "A      Alicia        le        cocina                Cecilia        y        por        eso        estudian        juntas."}],
   
    
    [["eeg", 16], "AcceptabilityJudgment", {s: "      Leandro        le        apena        a        Manuel        aunque        no        sean        amigos."}],
    [["eeg", 16], "AcceptabilityJudgment", {s: "A      Leandro        le        apena                Manuel        aunque        no        sean        amigos."}],
    [["eeg", 16], "AcceptabilityJudgment", {s: "  Leandro        le        habla        a        Manuel        aunque        no        sean        amigos."}],
    [["eeg", 16], "AcceptabilityJudgment", {s: "A      Leandro        le        habla                Manuel        aunque        no        sean        amigos."}],
        
    
    [["eeg", 17], "AcceptabilityJudgment", {s: "      Viviana        le        aterra        a        Luciano        porque        quedó        deforme."}],
    [["eeg", 17], "AcceptabilityJudgment", {s: "A      Viviana        le        aterra                Luciano        porque        quedó        deforme."}],
    [["eeg", 17], "AcceptabilityJudgment", {s: "Viviana      le        llora        a        Luciano        porque        quedó        deforme."}],
    [["eeg", 17], "AcceptabilityJudgment", {s: "A      Viviana        le        llora                Luciano        porque        quedó        deforme."}],

    
    [["eeg", 18], "AcceptabilityJudgment", {s: "      Valeria        le        importa        a        Camila        ya        que        sabe        mucho        del        tema."}],
    [["eeg", 18], "AcceptabilityJudgment", {s: "A      Valeria        le        importa                Camila        ya        que        sabe        mucho        del        tema."}],
    [["eeg", 18], "AcceptabilityJudgment", {s: "  Valeria        le        enseña        a        Camila        ya        que        sabe        mucho        del        tema."}],
    [["eeg", 18], "AcceptabilityJudgment", {s: "A      Valeria        le        enseña                Camila        ya        que        sabe        mucho        del        tema."}],

    [["eeg", 19], "AcceptabilityJudgment", {s: "      Osvaldo        le        cansa        a        Leticia        cuando no quiere callarse."}],
    [["eeg", 19], "AcceptabilityJudgment", {s: "A      Osvaldo        le        cansa                Leticia        cuando no quiere callarse."}],
    [["eeg", 19], "AcceptabilityJudgment", {s: "  Osvaldo        le        canta        a        Leticia        cuando no quiere callarse."}],
    [["eeg", 19], "AcceptabilityJudgment", {s: "A      Osvaldo        le        canta                Leticia        cuando no quiere callarse."}],
 
 
    [["eeg", 20], "AcceptabilityJudgment", {s: "      Miguel         le        asusta        a        Raúl        porque es capaz de delatarlo."}],
    [["eeg", 20], "AcceptabilityJudgment", {s: "A      Miguel         le        asusta                Raúl        porque es capaz de delatarlo."}],
    [["eeg", 20], "AcceptabilityJudgment", {s: "  Miguel         le        apunta        a        Raúl    porque es capaz de delatarlo."}],
    [["eeg", 20], "AcceptabilityJudgment", {s: "A      Miguel         le        apunta                Raúl        porque es capaz de delatarlo."}],
    
    
    [["eeg", 21], "AcceptabilityJudgment", {s: "      Felipe        le        disgusta        a        Silvana        porque        se        peleó        con         su        jefe."}],
    [["eeg", 21], "AcceptabilityJudgment", {s: "A      Felipe        le        disgusta                Silvana        porque        se        peleó        con         su        jefe."}],
    [["eeg", 21], "AcceptabilityJudgment", {s: "  Felipe        le        contesta        a        Silvana        porque        se        peleó        con         su        jefe."}],
    [["eeg", 21], "AcceptabilityJudgment", {s: "A      Felipe        le        contesta                Silvana        porque        se        peleó        con         su        jefe."}],
   
    
    [["eeg", 22], "AcceptabilityJudgment", {s: "      Emilio        le        interesa        a        Enzo        para        ocupar        el        puesto."}],
    [["eeg", 22], "AcceptabilityJudgment", {s: "A      Emilio        le        interesa                Enzo        para        ocupar        el        puesto."}],
    [["eeg", 22], "AcceptabilityJudgment", {s: "      Emilio        le        insiste        a        Enzo        para        ocupar        el        puesto."}],
    [["eeg", 22], "AcceptabilityJudgment", {s: "A      Emilio        le        insiste                Enzo        para        ocupar        el        puesto."}],
 
    
    [["eeg", 23], "AcceptabilityJudgment", {s: "      Paola        le        repugna        a        Walter        porque        tiene        mal        aliento."}],
    [["eeg", 23], "AcceptabilityJudgment", {s: "A      Paola        le        repugna                Walter        porque        tiene        mal        aliento."}],
    [["eeg", 23], "AcceptabilityJudgment", {s: "      Paola        le        aconseja        a        Walter        porque        tiene        mal        aliento."}],
    [["eeg", 23], "AcceptabilityJudgment", {s: "A      Paola        le        aconseja                Walter        porque        tiene        mal        aliento."}],
     
    
    [["eeg", 24], "AcceptabilityJudgment", {s: "      Mario        le        enoja        a        Fabio        porque        compró        un         auto        nuevo."}],
    [["eeg", 24], "AcceptabilityJudgment", {s: "A      Mario        le        enoja                Fabio        porque        compró        un         auto        nuevo."}],
    [["eeg", 24], "AcceptabilityJudgment", {s: "  Mario        le        cobra        a        Fabio        porque        compró        un         auto        nuevo."}],
    [["eeg", 24], "AcceptabilityJudgment", {s: "A      Mario        le        cobra                Fabio        porque        compró        un         auto        nuevo."}],
 
 
   [["critems1", 1], "AcceptabilityJudgment", {s: " Andrea le alegra a Marta cuando trae buenas noticias.    "}],
   [["critems1", 1], "AcceptabilityJudgment", {s: " A Andrea le alegra Marta cuando trae buenas noticias.  "}],
   [["critems1", 1], "AcceptabilityJudgment", {s: " Andrea le avisa a Marta cuando trae buenas nticias.   "}],
   [["critems1", 1], "AcceptabilityJudgment", {s: " A Andrea le avisa Marta cuando trae buenas noticias.  "}],
   
   [["critems1", 2], "AcceptabilityJudgment", {s: " Cintia le aturde a Andrés porque su voz es insoportable.  "}],
   [["critems1", 2], "AcceptabilityJudgment", {s: " A Cintia le aturde Andrés porque su voz es insoportable.  "}],
   [["critems1", 2], "AcceptabilityJudgment", {s: " Cintia le suspira a Andrés porque su voz es insoportable.   "}],
   [["critems1", 2], "AcceptabilityJudgment", {s: " A Cintia le suspira Andrés porque su voz es insoportable.  "}],
   
   [["critems1", 3], "AcceptabilityJudgment", {s: " Sandra  le convence a Rodrigo para ser protagonista de la obra. "}],
   [["critems1", 3], "AcceptabilityJudgment", {s: " A Sandra le convence Rodrigo para ser protagonista de la obra.   "}],
   [["critems1", 3], "AcceptabilityJudgment", {s: " Sandra le susurra a Rodrigo para ser protagonista de la obra.  "}],
   [["critems1", 3], "AcceptabilityJudgment", {s: " Sandra le susurra Rodrigo para ser protagonista de la obra.  "}],
   
   
   [["critems1", 4], "AcceptabilityJudgment", {s: " Hernán le enferma a Sabrina porque es demasiado insoportable. "}],
   [["critems1", 4], "AcceptabilityJudgment", {s: " A Hernán le enferma Sabrina porque es demasiado insoportable. "}],
   [["critems1", 4], "AcceptabilityJudgment", {s: " Hernán le huye a Sabrina porque es demasiado insoportable."}],
   [["critems1", 4], "AcceptabilityJudgment", {s: " A Hernán le huye Sabrina porque es demasiado insoportable. "}],
 
   [["critems1", 5], "AcceptabilityJudgment", {s: "Fernando le exaspera a Ignacio porque siempre le va mal en el examen.   "}],
   [["critems1", 5], "AcceptabilityJudgment", {s: "A Fernando le exaspera Ignacio porque siempre le va mal en el examen.  "}],
   [["critems1", 5], "AcceptabilityJudgment", {s: "Fernando le llora a Ignacio porque siempre le va mal en el examen."}],
   [["critems1", 5], "AcceptabilityJudgment", {s: "A Fernando le llora Ignacio  "}],
   
     [["critems1", 6], "AcceptabilityJudgment", {s: "Juana le harta a Nancy porque no quiere dormirse. "}],
   [["critems1", 6], "AcceptabilityJudgment", {s: "A Juana le harta Nancy porque no quiere dormirse.  "}],
   [["critems1", 6], "AcceptabilityJudgment", {s: "Juana le lee a Nancy porque no quiere dormirse."}],
   [["critems1", 6], "AcceptabilityJudgment", {s: "A Juana le lee Nancy porque no quiere dormirse.  "}],

    ["filler", "AcceptabilityJudgment", {s: "Los trabajadores han decidido volver a la huelga al no lograrse avances en las últimas negociaciones con representantes de la compañía."}],
    ["filler", "AcceptabilityJudgment", {s: "José engañó a su mujer con la mejor amiga de Clara."}],
    ["filler", "AcceptabilityJudgment", {s: "Los nuevos muebles serán acomodados de acuerdo con las órdenes del inquilino de la oficina."}],
    ["filler", "AcceptabilityJudgment", {s: "El telegrama ordena que el banco se prepare para recibir al grupo de inversores."}],
    ["filler", "AcceptabilityJudgment", {s: "El secretario subrayó que el general conservador queda totalmente deslegitimado."}],
    ["filler", "AcceptabilityJudgment", {s: "El pastor les dio su bendición a los fieles de la parroquia."}],
    ["filler", "AcceptabilityJudgment", {s: "El alemán abandonó a su mujer luego de que ella se burlara de él."}],
    ["filler", "AcceptabilityJudgment", {s: "Los colegas se abrazan después de no haberse visto por un largo tiempo."}],
    ["filler", "AcceptabilityJudgment", {s: "La gente se acostumbra a los cambios abruptos cuando el país vive en crisis."}],
    ["filler", "AcceptabilityJudgment", {s: "La gimnasta bautizó al bebé con el nombre de Tomás."}],
    ["filler", "AcceptabilityJudgment", {s: "Los compañeros de la oficina le celebraron el cumpleaños a Sara esa misma tarde."}],
    ["filler", "AcceptabilityJudgment", {s: "A Estefanía le envían cartas a la dirección equivocada."}],
    ["filler", "AcceptabilityJudgment", {s: "El intendente hizo evacuar la ciudad después de las inundaciones."}],
    ["filler", "AcceptabilityJudgment", {s: "Al chofer le deben el salario desde hace tres meses."}],
    ["filler", "AcceptabilityJudgment", {s: "El novio le compone una canción de amor a Martina."}],
    ["filler", "AcceptabilityJudgment", {s: "La entrevista con el científico entusiasmó a los investigadores durante la universidad."}],
    ["filler", "AcceptabilityJudgment", {s: "La pareja le devolvió el dinero prestado al banco y finalmente saldó su deuda."}],
    ["filler", "AcceptabilityJudgment", {s: "A los comensales les cayó mal la comida y hubo que a la ambulancia llamar."}],
    ["filler", "AcceptabilityJudgment", {s: "El futbolista pateó la pelota hacia el delantero del equipo."}],
    ["filler", "AcceptabilityJudgment", {s: "La muchacha se enteró de lo sucedido e inmediatamente llamó con su amiga."}],
    ["filler", "AcceptabilityJudgment", {s: "La visita inesperada de la tía generó malestar de la familia."}],
    ["filler", "AcceptabilityJudgment", {s: "La actriz sin trabajo se quedó después del fracaso de la obra."}],
    ["filler", "AcceptabilityJudgment", {s: "El ama de casa se tiñe el pelo en su hogar por recortar gastos."}],
    ["filler", "AcceptabilityJudgment", {s: "La mala ubicación del hospital dificulta que los pacientes con facilidad lo encuentren."}],
    ["filler", "AcceptabilityJudgment", {s: "El martes pasado a María Inés el auto le robaron mientras estaba en una fiesta."}],
    
    ["fillerN", "AcceptabilityJudgment", {s: "Aunque los médicos hicieron todo lo que estuvo a su alcance, el paciente a la cirugía no sobrevivió."},
    "Question",                         {q:"¿El paciente murió por un error médico?" ,as: ["No", "Sí"]}],
    ["fillerY", "AcceptabilityJudgment", {s: "Cuando necesitan comer los mendigos va al comedor municipal."},
    "Question",                         {q:"¿El comedor municipal recibe a los mendigos?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Mientras jugaba al tenis Andrés se quebró la muñeca y su hermano a la sala de urgencias lo llevó."},
    "Question",                         {q:"¿Es el hermano de Andrés quien estaba jugando al tenis?", as: ["No", "Sí"]}],
    ["fillerY", "AcceptabilityJudgment", {s: "El año pasado participó la compañía del concurso y ganó tres premios."},
    "Question",                         {q:"¿El año pasado fue un buen año para la compañía?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Todas las mañanas al guardia del edificio le muestra sus credenciales el oficinista."},
    "Question",                         {q:"¿Es el guardia quien muestra sus credenciales por la mañana?", as: ["No", "Sí"]}],
    ["fillerY", "AcceptabilityJudgment", {s: "Apenas se enteró de las novedades Andrea con los reporteros del canal de televisión colaboró."},
    "Question",                         {q:"¿Andrea habló con los periodistas?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Desde que se compró los zapato, a Sergio le duelen los pies."},
    "Question",                         {q:"¿Sergio tuvo siempre dolor de pies?", as: ["No", "Sí"]}],
    ["fillerY", "AcceptabilityJudgment", {s: "Durante este semestre el alumno sólo se sacó buenas notas y de sus profesores recibió felicitaciones."},
    "Question",                         {q:"¿Los profesores apoyaron el esfuerzo del alumno?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Aunque no sepa bailar muy bien, la gracia y belleza de la muchacha despiertan la admiración de su compañero."},
    "Question",                         {q:"¿El muchacho admira cómo baila la chica?",as: ["No", "Sí"]}],
    ["fillerY", "AcceptabilityJudgment", {s: "Una hora antes de la función, escenógrafos terminaron de montar la escena."},
    "Question",                         {q:"¿El montaje de la obra terminó a último momento?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Siempre que está nublado la anciana tiene malos presentimientos sobre la salud de su marido."},
    "Question",                         {q:"¿Murió el marido de la anciana?", as: ["No", "Sí"]}],
    ["fillerY", "AcceptabilityJudgment", {s: "Después del partido al árbitro le tiraron botellas de vidrio y piedras por sus malas decisiones."},
    "Question",                         {q:"¿Trataron de herir al árbitro?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Siempre que tiene un examen Mariana repite la lección a sus primas y tíos."},
    "Question",                         {q:"¿Son las primas quienes repiten la lección?", as: ["No", "Sí"]}],
    ["fillerY", "AcceptabilityJudgment", {s: "Antes de hacer la masa se debe precalentar el horno a temperatura moderada."},
    "Question",                         {q:"¿La masa debe hacerse después de prender el horno?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Como no llueva, los granjeros perderán la cosecha de soja de este año."},
    "Question",                         {q:"¿Los granjeros están preocupados por el exceso de lluvia?", as: ["No", "Sí"]}],
    ["fillerY", "AcceptabilityJudgment", {s: "Aunque los sindicatos se rehúsan a levantar la protesta, muchos camioneros siguen trabajando."},
    "Question",                         {q:"¿La protesta continúa?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Para tener éxito en la pesca de trucha se debe tener paciencia y buena carnada."},
    "Question",                         {q:"¿El consejo es sobre la cría de trucha?",as: ["No", "Sí"]}] ,
    ["fillerY", "AcceptabilityJudgment", {s: "Porque encontrar el amor es difícil muchas personas acuden a profesionales y grupos de ayuda."},
    "Question",                         {q:"¿Son los profesionales quienes pueden dar ayuda?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Debido a la peste los terratenientes sacrificaron gran parte de su ganado."},
    "Question",                         {q:"¿El ganado fue sacrificado antes de la peste?",as: ["No", "Sí"]}] ,
    ["fillerY", "AcceptabilityJudgment", {s: "En vez de resolver los problemas inmediatos, el partido trazó un plan de trabajo a largo plazo."},
    "Question",                         {q:"¿El plan contempla posibles problemas en el futuro?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Una vez que se comete un delito, es muy difícil conseguir que el Estado nos crea de nuevo."},
    "Question",                         {q:"¿Es el Estado quien comete el delito?", as: ["No", "Sí"]}],
    ["fillerY", "AcceptabilityJudgment", {s: "A pesar de que frecuentemente se pintan las aulas, las condiciones de la universidad pública son cada vez más deplorables."},
    "Question",                         {q:"¿Se hacen trabajos de mantenimiento en la universidad?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Si bien se redujo el crimen en la ciudad, la gente todavía vive con miedo."},
    "Question",                         {q:"¿Hay más crimen en la ciudad?", as: ["No", "Sí"]}],
    ["fillerY", "AcceptabilityJudgment", {s: "Una vez a la semana el panadero le paga a los proveedores de harina."},
    "Question",                         {q:"¿Es constante el panadero con sus pagos?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Para modificar la ley es necesario que ambas cámaras aprueben el proyecto con más de dos tercios de los votos."},
    "Question",                         {q:"¿Puede una sola cámara modificar la ley si tiene la mayoría de los votos?", as: ["No", "Sí"]}],
     
    ["fillerY", "AcceptabilityJudgment", {s: "El gato del tercer piso maúlla siempre que sus dueños lo dejan solo."},
    "Question",                         {q:"¿Tiene más de un dueño el gato?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Marta le contó la historia a su hija cuando su hermano cumplió la mayoría de edad."},
    "Question",                         {q:"¿La hija de Marta se enteró de la historia a través de su hermano?", as: ["No", "Sí"]}],         
    ["fillerY", "AcceptabilityJudgment", {s: "Todos los payasos llevan sombrero de color rojo menos uno"},
    "Question",                         {q:"¿Hay algún payaso que no lleve sombrero rojo?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Sólo algunas personas votaron en las últimas elecciones barriales."},
    "Question",                         {q:"¿Los resultados de la votación representaron la elección de todos los vecinos?", as: ["No", "Sí"]}],     
    ["fillerY", "AcceptabilityJudgment", {s: "El senador donó una gran suma de dinero a los directores de la biblioteca."},
    "Question",                         {q:"¿La donación vino de parte de un miembro del gobierno?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "En la fábrica descubrieron que no todos los empleados estaban capacitados para utilizar las nuevas máquinas."},
    "Question",                         {q:"¿Todos los empleados son competentes?", as: ["No", "Sí"]}],     
    ["fillerY", "AcceptabilityJudgment", {s: "El dibujante le entregó los bocetos al editor durante la entrevista."},
    "Question",                         {q:"¿Es el editor quien recibió los dibujos?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "No serán aceptadas por la agencia aquellas personas que no presenten los papeles necesarios."},
    "Question",                         {q:"¿Es conveniente que las personas que no tienen todos los papeles se presenten?", as: ["No", "Sí"]}],     
    ["fillerY", "AcceptabilityJudgment", {s: "Las autoridades sanitarias combatieron la plaga adecuadamente."},
    "Question",                         {q:"¿Ha desaparecido la plaga?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Esa tarde Federico convenció a Luciana de ir a la playa."},
    "Question",                         {q:"¿Federico habló con Luciana por la mañana para convencerla de ir a la playa?", as: ["No", "Sí"]}],     
    ["fillerY", "AcceptabilityJudgment", {s: "La encargada del edificio confesó que había robado el dinero."},
    "Question",                         {q:"¿Apareció el ladrón del dinero?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Cuando la anciana se fue, sus amigas la criticaron por su vestimenta inadecuada."},
    "Question",                         {q:"¿La anciana estaba presente cuando sus amigas la criticaron?", as: ["No", "Sí"]}],     
    ["fillerY", "AcceptabilityJudgment", {s: "Nadie conoce a la pianista nueva del restaurante."},
    "Question",                         {q:"¿El personal del restaurante tiene un integrante más?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Con mucho esfuerzo, los amigos de José juntaron el dinero para que pudiera arreglar su auto."},
    "Question",                         {q:"¿Los amigos de José arreglaron su auto?", as: ["No", "Sí"]}],     
    ["fillerY", "AcceptabilityJudgment", {s: "El libro contiene textos de autores antiguos y una reseña de gran parte de sus obras."},
    "Question",                         {q:"¿El libro contiene obras de más de un autor?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Al asesino lo condenaron a cuarenta años de prisión."},
    "Question",                         {q:"¿El asesino recibió una condena corta?", as: ["No", "Sí"]}],     
    ["fillerY", "AcceptabilityJudgment", {s: "El tutor le corrigió los errores al chico rubio."},
    "Question",                         {q:"¿El tutor realizó su trabajo?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Mientras el hombre cazaba, las mujeres se entretenían en la casa."},
    "Question",                         {q:"¿Las mujeres acompañaron a los hombres?", as: ["No", "Sí"]}],     
    ["fillerY", "AcceptabilityJudgment", {s: "La recepcionista le comunicó al gerente las noticias de esa mañana."},
    "Question",                         {q:"¿El gerente recibió las novedades?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Para la noche, los albañiles habían terminado de construir las paredes."},
    "Question",                         {q:"¿Los obreros terminaron con las paredes por la mañana?", as: ["No", "Sí"]}],     
    ["fillerY", "AcceptabilityJudgment", {s: "El músico le copió su número de teléfono en un papel a la trompetista de orquesta."},
    "Question",                         {q:"¿El músico quería que la trompetista se comunicara con él?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "El pago se efectuó a fin de mes, y los becarios volvieron a trabajar."},
    "Question",                         {q:"¿Los becarios trabajaron durante todo el mes?", as: ["No", "Sí"]}],     
    ["fillerY", "AcceptabilityJudgment", {s: "Los niños guardaron los juguetes de su hermana en el armario."},
    "Question",                         {q:"¿El dueño de los juguetes es una chica?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Silvia guió a su amiga hasta la puerta principal de la casa y se despidió."},
    "Question",                         {q:"¿La casa es de la amiga de Silvia?", as: ["No", "Sí"]}],     
    ["fillerY", "AcceptabilityJudgment", {s: "Después de mezclar la sal, los huevos y el harina, hay que dejar reposar la mezcla por media hora."},
    "Question",                         {q:"¿La masa lleva harina y huevos?", as: ["Sí", "No"]}],
    ["fillerN", "AcceptabilityJudgment", {s: "Mario le presentó su mujer al traumatólogo del hospital."},
    "Question",                         {q:"¿El médico conocía a la mujer de Mario?", as: ["No", "Sí"]}]        
];
    