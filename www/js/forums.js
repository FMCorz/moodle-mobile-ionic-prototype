angular.module('mm.forums', [])

.factory('mmForumDiscussions', function() {
    var store = {},
        self = {};

    var lastnames = [
        'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'García', 'Rodríguez', 'Wilson',
        'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Meyer', 'Weber', 'Schulz', 'Wagner', 'Becker', 'Hoffmann',
        'Novák', 'Svoboda', 'Novotný', 'Dvořák', 'Černý', 'Procházková', 'Kučerová', 'Veselá', 'Horáková', 'Němcová',
        'Смирнов', 'Иванов', 'Кузнецов', 'Соколов', 'Попов', 'Лебедева', 'Козлова', 'Новикова', 'Морозова', 'Петрова',
        '佐藤', '鈴木', '高橋', '田中', '渡辺', '伊藤', '山本', '中村', '小林', '斎藤'
    ];

    var firstnames = [
        'Jacob', 'Ethan', 'Michael', 'Jayden', 'William', 'Isabella', 'Sophia', 'Emma', 'Olivia', 'Ava',
        'Lukas', 'Leon', 'Luca', 'Timm', 'Paul', 'Leonie', 'Leah', 'Lena', 'Hanna', 'Laura',
        'Jakub', 'Jan', 'Tomáš', 'Lukáš', 'Matěj', 'Tereza', 'Eliška', 'Anna', 'Adéla', 'Karolína',
        'Даниил', 'Максим', 'Артем', 'Иван', 'Александр', 'София', 'Анастасия', 'Дарья', 'Мария', 'Полина',
        '翔', '大翔', '拓海', '翔太', '颯太', '陽菜', 'さくら', '美咲', '葵', '美羽'
    ];

    var subjects = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Vivamus non magna rhoncus, elementum velit eget, molestie urna.',
        'Donec et purus et erat sodales eleifend non sed erat.',
        'Phasellus a tortor semper, volutpat nulla non, rutrum odio.',
        'Aenean ut orci efficitur, gravida diam ut, luctus ligula.',
        'Donec viverra ipsum eget est consectetur, a suscipit lorem rhoncus.',
        'Suspendisse et felis a quam pulvinar hendrerit.',
        'Curabitur accumsan velit sollicitudin, fermentum sapien vel, posuere lacus.',
        'Maecenas vestibulum velit vitae orci elementum, in ultrices nulla lobortis.',
        'Etiam fringilla orci ut tellus mollis sagittis.',
        'Duis vehicula lacus sed aliquam dapibus.',
        'Etiam vehicula ligula sed lorem commodo, et iaculis ipsum placerat.',
        'Nulla lobortis est sit amet ex cursus dapibus.',
        'Vestibulum sollicitudin dolor non nunc bibendum ultrices.',
        'Aliquam varius urna ut diam blandit ullamcorper sed nec sem.',
        'Fusce imperdiet lorem imperdiet tortor sodales pharetra.',
        'Fusce mollis orci commodo orci dignissim, nec gravida mi euismod.',
        'Aenean in nunc eu tellus scelerisque dapibus.',
        'Aliquam eleifend ante varius dolor congue rhoncus.',
        'Fusce condimentum ante quis tortor rhoncus fringilla.',
        'Curabitur vitae enim ut turpis bibendum finibus id at nibh.',
        'Morbi vitae tellus eget ligula suscipit convallis.',
        'Mauris in nunc sed mauris faucibus volutpat at vitae sapien.',
        'Praesent vitae velit a purus blandit mattis non aliquam neque.',
        'Phasellus sit amet dui a lorem tempus fermentum.',
        'Vivamus vitae ligula tempus, tincidunt enim at, cursus turpis.',
        'Praesent non eros convallis, egestas urna sed, iaculis velit.',
        'Ut vel augue eget odio egestas interdum.',
        'Nunc et orci feugiat, efficitur nibh at, luctus nulla.',
        'Fusce tristique tortor eu sodales consequat.',
        'Praesent ac arcu sed est feugiat consectetur a in urna.',
        'Proin eget odio et velit iaculis auctor eget ac ipsum.',
        'Praesent tempus elit in ante viverra, non maximus ex sodales.',
        'Donec pretium ipsum nec bibendum tincidunt.',
        'Fusce congue quam ac fringilla vulputate.',
        'Donec posuere dui et neque rutrum, iaculis semper nunc condimentum.',
        'Nam ac augue vel nisi porttitor rhoncus.',
        'Sed ut orci pretium, bibendum risus eget, consectetur orci.',
        'Duis consectetur libero et tellus aliquet, nec lacinia mi sollicitudin.',
        'Suspendisse tincidunt nibh sed interdum porta.',
        'Quisque eu tortor iaculis, hendrerit lectus eget, tristique nisi.',
        'Aenean imperdiet lacus eget elementum laoreet.',
        'Aliquam quis lorem ac dolor bibendum pellentesque ac id nisl.',
        'Nunc faucibus massa eu congue iaculis.',
        'Morbi sed neque in est euismod aliquam.',
        'Phasellus accumsan augue eget ornare varius.',
        'Ut ut quam feugiat, congue orci et, ultrices tellus.',
        'Donec a enim ac metus volutpat elementum.',
        'Nunc consectetur magna vel risus vulputate, eu eleifend erat tristique.',
        'Integer quis orci luctus, commodo nisl id, dapibus metus.',
        'Mauris in nunc rhoncus, consectetur quam faucibus, convallis augue.',
        'Nullam efficitur nibh viverra massa feugiat, at vehicula erat tincidunt.',
        'Nulla finibus augue vitae metus efficitur, in blandit neque condimentum.',
        'Nunc sit amet nulla iaculis, commodo nulla id, vehicula augue.',
        'Vestibulum ultrices diam non elit ornare, sed maximus ipsum bibendum.',
        'Suspendisse sed arcu commodo, blandit lectus vel, vulputate quam.',
        'Nullam imperdiet sem non malesuada rhoncus.',
        'Praesent eu dolor maximus, sodales risus ac, efficitur orci.',
        'Praesent porta diam et nibh condimentum aliquam.',
        'Integer quis lacus finibus, convallis sapien vel, sodales urna.',
        'Aliquam quis nibh pulvinar, hendrerit nibh sed, feugiat diam.',
        'Pellentesque elementum libero eu lorem tincidunt congue.',
        'Aenean ut arcu imperdiet, tincidunt augue eu, sodales sapien.',
        'Ut pulvinar nulla id ultricies pulvinar.',
        'Ut dapibus lorem nec commodo malesuada.',
        'Aenean pulvinar est et molestie rutrum.',
        'Suspendisse eu diam vehicula nibh auctor suscipit',
    ];

    var paragraphs = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum convallis lacinia. Donec elementum, leo ut commodo dictum, enim augue porta nisl, nec vestibulum dui lacus id risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer vitae mauris ut elit aliquam iaculis. Integer nulla velit, bibendum at urna ac, egestas tincidunt risus. Suspendisse eget nisl et sapien posuere feugiat. Cras finibus velit sit amet sem fermentum blandit. Praesent velit ex, accumsan at commodo non, commodo at neque.',
        'Integer justo diam, tristique eu ex vitae, consequat dapibus massa. Nulla est tortor, cursus et elit nec, mollis elementum sapien. Nullam convallis nisl in magna ullamcorper, non luctus leo porta. Cras sit amet magna gravida, sagittis turpis eget, ultrices felis. Aliquam purus dolor, fringilla sed ipsum ut, imperdiet congue nunc. Cras nec finibus nulla, a placerat nulla. Fusce at eros vitae quam hendrerit molestie. Cras suscipit nisl vel mollis bibendum. Phasellus euismod urna at massa blandit ultricies. Pellentesque varius elementum euismod. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla tincidunt neque ac condimentum commodo. In hac habitasse platea dictumst. Pellentesque hendrerit ac elit a laoreet. Proin consectetur consequat diam sit amet blandit. Vivamus dictum turpis nisl, a ullamcorper arcu facilisis vel.',
        'In in mi at turpis sagittis rhoncus sed sit amet orci. Suspendisse potenti. Praesent tincidunt pulvinar tristique. Mauris luctus urna eu urna blandit, eget eleifend risus dignissim. Ut ac pellentesque tortor. Vestibulum ultrices suscipit est quis pellentesque. Fusce varius, enim vitae pulvinar consequat, justo mauris malesuada dolor, eget hendrerit urna ipsum et felis. Integer placerat mi velit, ac consectetur erat efficitur ac. Nulla at ipsum sed felis dictum sodales. Sed eu sagittis elit. Sed ac condimentum enim.',
        'Sed et augue ut tortor rutrum volutpat vitae vel orci. Fusce eu felis et est ullamcorper efficitur. In id sem rhoncus, ultricies lorem ut, molestie neque. Maecenas eros tellus, interdum quis ipsum a, aliquet pretium orci. Vestibulum lobortis augue id metus congue posuere. Pellentesque ac placerat felis. Fusce suscipit nulla quis elementum dignissim. Sed vulputate semper lorem eu cursus.',
        'Nunc luctus commodo leo. Mauris vel purus libero. Phasellus auctor a diam a placerat. Donec at condimentum diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque tempor lorem vel nunc ullamcorper lobortis. Sed ante nibh, placerat ac malesuada sed, venenatis a est. Phasellus bibendum mauris id tellus maximus accumsan. Praesent mollis, elit ut vehicula luctus, nisi est tincidunt mi, nec egestas enim sapien vel elit.',
        'Donec elementum tempor metus. Maecenas rhoncus non purus et suscipit. Etiam feugiat, dui sed faucibus fermentum, nisi enim facilisis mi, ac tincidunt turpis augue feugiat lorem. Etiam in consequat elit, vel feugiat sem. Suspendisse non urna est. Maecenas augue leo, lobortis a neque a, condimentum molestie odio. Vestibulum placerat ornare risus eu finibus. Sed auctor ac lectus at dapibus.',
        'Aenean a tortor turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque blandit tempor purus, id lobortis libero viverra a. In quis luctus lorem, nec rutrum lacus. Aliquam eu eros leo. In tincidunt sed nisi sit amet placerat. Mauris nec rutrum metus. Nam facilisis diam sed justo vulputate lacinia. Quisque nisi nisi, sagittis eget justo in, vehicula dapibus sem. Morbi leo ipsum, ornare et tellus at, ultrices ornare risus. Suspendisse vulputate nulla tortor, ultricies aliquet orci tincidunt a. Fusce eu molestie sem. Praesent id odio quis elit tincidunt efficitur nec vel erat. Sed eu lacinia ex, ac ultricies ipsum.',
        'Nullam et finibus nisi. Duis auctor condimentum enim non varius. Pellentesque metus elit, fringilla nec mauris non, suscipit molestie ante. Nam non mi at risus aliquam imperdiet at eget dolor. Vivamus lacus nunc, convallis ac mattis et, commodo condimentum magna. Fusce ultrices consectetur turpis, condimentum molestie nulla hendrerit vel. Ut eget nisl nibh. Aliquam feugiat tortor ac rhoncus bibendum. Curabitur sed risus nec quam congue ultricies. Quisque faucibus sodales lectus. Integer imperdiet lacus ac metus finibus maximus. Fusce eu urna ut diam tincidunt cursus vitae non eros. Integer ante purus, dictum sed vulputate vitae, dictum eget turpis. Integer volutpat nunc nec purus ullamcorper, eget dictum lacus condimentum.',
        'Nulla facilisi. Cras luctus metus sit amet lectus dignissim, feugiat vulputate nisi faucibus. Curabitur luctus nisi ut erat feugiat, eget molestie tellus tempus. Nam libero neque, rhoncus in eleifend ut, laoreet sed magna. Cras facilisis consequat metus, ac egestas purus pretium nec. Vivamus quis pretium lacus. In rhoncus lorem dui, gravida tincidunt ligula rutrum at. Morbi sit amet erat ut leo blandit auctor. Nunc cursus mattis erat in accumsan. Vivamus et pulvinar neque. Nulla fringilla dui eget enim convallis, vitae bibendum tortor dignissim. Phasellus nec est nisl. Quisque sed nisi magna. Cras mollis nunc vitae ipsum dictum, vel auctor elit rutrum. Vivamus mattis nisi id vehicula porta.',
        'Nullam porttitor, justo sit amet faucibus iaculis, massa erat malesuada ante, convallis tristique ipsum ante efficitur eros. Suspendisse ut felis pellentesque ante congue dapibus id quis diam. Donec scelerisque tincidunt libero sit amet aliquam. Nulla fermentum et turpis vitae sodales. Donec feugiat nibh id nunc interdum fermentum. Nunc rutrum eleifend purus nec congue. Praesent vel sem pulvinar, laoreet massa vel, consectetur metus. Nam aliquet velit et metus mollis pellentesque. Ut sit amet ante dui. In congue dapibus mauris vitae varius. Nunc dictum sem ac posuere blandit. Proin gravida velit libero, nec consequat risus convallis a. Nulla facilisi. Aenean sodales, sapien a ultrices feugiat, mi massa imperdiet tortor, id ullamcorper ligula arcu nec sapien. Maecenas malesuada ac erat quis pretium. Mauris congue massa sed mollis varius.',
        'Aliquam elementum mauris sed nisl pharetra viverra. Mauris cursus suscipit porttitor. Proin eu mi et turpis accumsan faucibus. Praesent ac velit pulvinar, ornare tellus et, porta augue. In et maximus ipsum, a scelerisque leo. Vestibulum posuere tincidunt velit, a commodo ipsum lobortis at. Curabitur eget egestas ipsum, non porta orci. Integer cursus facilisis ornare. Suspendisse sit amet condimentum dolor, sed malesuada mauris. Sed quam odio, placerat nec sodales sit amet, efficitur ac erat. Integer eu turpis sit amet ante sagittis accumsan. Vivamus malesuada erat at risus tincidunt pretium.',
        'Aliquam felis dui, placerat vehicula volutpat sed, ultrices ut purus. Sed iaculis at turpis ac consectetur. Phasellus et pretium enim. Curabitur lacinia dictum mauris vitae tincidunt. Pellentesque sem nulla, suscipit vel dignissim a, rutrum in diam. Donec pellentesque finibus ex. Pellentesque placerat tempor velit, ac scelerisque neque aliquet ac. Ut libero lacus, dictum a mattis in, iaculis eu ex. Cras condimentum est quis orci porttitor, quis dapibus dolor dapibus. Aliquam vel massa fringilla, lobortis metus in, condimentum leo. Etiam quis velit auctor, cursus augue vitae, facilisis augue. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        'In sollicitudin congue risus vitae dapibus. Nam ipsum dui, semper vel felis sed, venenatis volutpat est. Phasellus velit est, vehicula ac rhoncus quis, aliquam quis eros. Integer mauris enim, rutrum in iaculis a, tincidunt ut erat. Nam nibh lacus, interdum at lobortis at, facilisis rhoncus diam. Curabitur sed tellus nec elit scelerisque congue non ullamcorper sapien. Pellentesque feugiat rhoncus lobortis.',
        'Nunc egestas odio in neque sagittis consectetur. Nunc id aliquam turpis. Donec ornare, ante ac blandit facilisis, nunc libero elementum est, id volutpat justo justo a erat. Donec id nunc volutpat, convallis mi id, mattis nulla. Pellentesque fermentum sem vel justo lacinia dictum pulvinar et diam. Nunc congue tellus orci, eget fermentum tortor feugiat at. Maecenas faucibus dui nec nulla posuere rutrum. Vivamus massa magna, iaculis non sapien vitae, ultricies ullamcorper felis. Morbi nulla nunc, consectetur vel ante vel, dapibus ultricies mauris. Vestibulum consequat urna tellus, in mollis est rhoncus quis. Proin tristique elit vel dictum malesuada. Nunc imperdiet eros pulvinar justo varius, ac varius risus tincidunt. Donec tincidunt, leo vel sodales tincidunt, dolor erat porta quam, ac fringilla velit enim quis ante. Nam dignissim pellentesque felis vitae interdum. Integer mollis metus vel laoreet rhoncus.',
        'Quisque porttitor est metus, sit amet posuere diam porttitor id. Praesent justo enim, bibendum nec porta at, scelerisque vel magna. Vivamus lacinia vitae augue id elementum. Fusce congue urna non scelerisque facilisis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi porttitor nisl sit amet elit sagittis, nec maximus lorem condimentum. Praesent sit amet malesuada elit. Cras eu magna in erat suscipit aliquet in vel massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer tristique sagittis ex in dignissim. Donec suscipit faucibus orci, et rutrum metus interdum nec. Sed sed tellus in mi elementum vehicula eget at turpis. Etiam consectetur dictum enim, et ultricies ipsum condimentum et.',
        'Duis euismod augue a magna dictum tincidunt volutpat at tortor. Phasellus sit amet purus id tellus convallis ullamcorper eu sed dui. Suspendisse ac tempor nunc. Nam pretium congue tincidunt. Curabitur rhoncus turpis non quam consequat, id blandit erat blandit. Cras aliquet eros vel quam sagittis, at congue diam sodales. Sed lectus purus, commodo id feugiat eget, placerat et nulla. Donec blandit faucibus nibh vel pulvinar. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam congue pretium blandit. Morbi tincidunt erat a nisi efficitur, sit amet venenatis elit tristique.',
        'Vivamus finibus erat felis. In dignissim sodales convallis. Mauris ac lectus iaculis lorem vehicula fringilla. Maecenas pharetra mauris quam, sit amet cursus justo malesuada a. Nunc accumsan quam purus, consectetur commodo tellus aliquet quis. Ut finibus nisi tellus, non varius lacus vestibulum at. Proin dictum molestie nisl in vulputate. Quisque enim diam, bibendum sed lacus hendrerit, fringilla volutpat arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        'Quisque aliquam dolor est, vel vestibulum ipsum maximus non. Fusce ut risus egestas, placerat nisl sit amet, lacinia orci. Nam non efficitur mauris, pellentesque molestie mi. Aenean ultrices tortor egestas orci tempus, euismod pharetra nisi scelerisque. Mauris quis odio hendrerit urna ultrices iaculis. In hac habitasse platea dictumst. Duis ornare pharetra dui, at malesuada sem viverra in. Curabitur at suscipit ipsum. Donec a odio in tellus sodales semper id nec justo. Nunc fermentum, purus non convallis ornare, lectus leo hendrerit mi, nec pellentesque metus metus non risus. Vestibulum at metus tristique, sollicitudin elit vitae, sollicitudin diam. Proin at scelerisque nisi. Quisque euismod sed ex feugiat molestie. Sed vehicula augue ac nulla dapibus fringilla.',
        'Donec laoreet pellentesque aliquam. Quisque vel posuere nisi, in finibus sem. Duis fringilla facilisis ligula, vitae consequat ante. Nunc metus nibh, placerat quis tristique ut, vehicula in odio. Maecenas luctus, eros ut lobortis dictum, lorem elit blandit ligula, eget scelerisque ante sem sed dolor. Donec et vestibulum est, ut elementum enim. Integer venenatis sollicitudin sem ut malesuada. Suspendisse vitae sapien nibh. Nam nunc velit, pharetra eu consectetur vitae, pretium quis sem. Praesent ullamcorper leo a nisl luctus iaculis.',
        'Quisque rutrum tellus nec orci vehicula, sed sodales erat feugiat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam aliquam est at iaculis rhoncus. Aliquam vitae maximus felis, vitae mattis metus. Morbi sed ex tincidunt, luctus nisi et, ultricies orci. Nullam gravida efficitur neque, nec auctor mauris porttitor eu. Pellentesque tincidunt velit id nisi bibendum, sit amet lacinia lacus imperdiet. Etiam sollicitudin rutrum risus, et interdum felis fringilla et. Vestibulum semper diam at magna congue, non vulputate purus semper. Donec sed velit dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi volutpat nunc non est dignissim, vitae dapibus ex tincidunt. Donec vel risus eget erat volutpat vehicula ut a dolor.',
        'Suspendisse bibendum facilisis augue, luctus ullamcorper erat euismod varius. Ut feugiat id nisl ut mattis. Etiam scelerisque tincidunt tellus, ac aliquam erat mattis sed. Donec sagittis egestas feugiat. Nam placerat at metus eget dignissim. Morbi ac est varius leo vulputate euismod. Sed ac neque tempus ipsum finibus posuere ac non ante. In hac habitasse platea dictumst. Sed sollicitudin maximus ligula in bibendum. Donec placerat enim non tellus venenatis, eget rutrum justo ornare. Fusce egestas leo in enim elementum, id laoreet orci rhoncus. Proin magna ligula, varius nec euismod id, lobortis sed ante. Quisque ultrices rhoncus lorem et blandit.',
        'Curabitur imperdiet leo porta libero finibus, gravida euismod arcu hendrerit. Ut congue consequat ornare. Aliquam finibus ex nec elit aliquet, sed congue elit dictum. Phasellus fringilla pretium nisl, nec eleifend massa pellentesque non. Integer vitae felis quis neque consectetur volutpat. Aenean ut velit eu sem sodales dictum non id metus. Fusce id neque nec sem porttitor accumsan ac eget lacus. Nunc mattis nibh vel dui feugiat, ut cursus turpis ultricies.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat egestas diam, id varius est consequat id. Proin sodales accumsan neque, vel malesuada augue euismod vitae. Sed purus augue, accumsan ac diam nec, malesuada finibus elit. Mauris sit amet augue efficitur, venenatis sapien id, suscipit dui. Nulla vitae massa justo. Etiam maximus erat vel suscipit tristique. Ut imperdiet purus in justo lacinia, a suscipit justo eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nec vulputate turpis, ac feugiat purus. Morbi massa nulla, porttitor a lectus id, iaculis eleifend lorem. Duis fermentum scelerisque turpis eu porta.',
        'Morbi vitae neque quis turpis cursus venenatis non quis turpis. Suspendisse suscipit sollicitudin nibh, eu faucibus nibh malesuada et. Ut a convallis diam, et euismod ex. Curabitur quis convallis ligula. Integer lacinia porttitor placerat. Proin interdum mattis augue vel eleifend. Maecenas interdum egestas erat quis auctor.',
        'Vivamus volutpat mi laoreet, interdum lectus sit amet, malesuada lorem. Praesent ligula nulla, laoreet et tincidunt nec, ullamcorper non odio. Aenean sem nisi, condimentum ut maximus id, tempus sed turpis. Aliquam aliquet scelerisque risus, quis laoreet sem. Donec elit turpis, semper maximus lobortis sed, porttitor ac dolor. Curabitur eget tellus et nisi lacinia tincidunt. Maecenas sed gravida nibh, quis faucibus arcu.',
        'Aliquam ultrices, metus ut luctus porta, eros diam consequat est, vitae faucibus mauris leo vitae tellus. Praesent imperdiet quam in posuere maximus. Aenean et rhoncus dui, in congue magna. Praesent scelerisque vestibulum lorem id consectetur. Sed vehicula dolor vitae pulvinar venenatis. Sed blandit vulputate nulla vel luctus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras viverra rutrum nunc, sit amet molestie tortor gravida id.',
        'Suspendisse condimentum, ex sit amet mollis vestibulum, lorem lectus lacinia erat, eu interdum ante lorem et arcu. Vivamus eros nisi, suscipit nec mi eget, laoreet laoreet dolor. Nulla ac viverra leo, vitae ullamcorper ante. Duis mattis rhoncus leo eu bibendum. Suspendisse placerat nisl nulla, non fermentum ipsum laoreet a. Vivamus ut ex vel leo iaculis tincidunt. Ut vitae fermentum metus. Integer accumsan scelerisque arcu sed lobortis. Aenean fringilla velit sodales turpis porttitor, eget ultricies neque luctus. Mauris imperdiet luctus tempor. Praesent semper erat non lorem semper, eu dapibus metus vulputate. Donec consectetur sodales commodo.',
        'Ut consequat nibh risus, mattis tincidunt magna efficitur luctus. Praesent iaculis tincidunt vulputate. Nullam hendrerit purus in purus commodo vulputate. Curabitur in vulputate orci. Aliquam consectetur consequat porttitor. Nunc facilisis odio mauris, a luctus nulla laoreet et. Vivamus sit amet massa ultrices, interdum ligula ac, tempor enim. Mauris nec massa nibh. Vivamus in aliquet lectus, at iaculis magna. Nam a justo eu erat tincidunt euismod. Mauris pretium vulputate fringilla. Aenean eleifend lorem lorem. Integer eu tortor feugiat, semper sapien sed, pharetra lorem. Curabitur dapibus nec erat sit amet ultrices. Proin ut libero maximus mauris faucibus imperdiet. In rutrum tempor ligula ut ultricies.',
        'Maecenas non neque a libero euismod tempor condimentum non sem. Nunc id lobortis justo, vestibulum sagittis ex. Fusce a turpis eros. Curabitur auctor felis nec purus pharetra, ac vulputate lacus consectetur. Phasellus ullamcorper id eros et fermentum. Mauris ac mattis enim. Duis ac pharetra est, lobortis facilisis dui. Integer auctor suscipit magna iaculis consequat. Nullam rutrum nunc mauris, vitae varius odio gravida vestibulum. Vestibulum congue molestie lectus viverra laoreet. Vivamus finibus eget nulla et placerat.',
        'Duis accumsan augue nec augue tristique, quis rhoncus mi interdum. Sed at tristique tellus. In hac habitasse platea dictumst. Etiam a feugiat leo, a tincidunt lectus. Morbi purus nisl, dignissim at imperdiet sit amet, euismod a lacus. Sed luctus felis volutpat tempus sagittis. Morbi sed sollicitudin lacus. Mauris venenatis id quam vel mattis. Maecenas eget lacus quis dolor ultricies molestie commodo id diam. Sed venenatis volutpat dolor, a consequat justo ornare eget. Maecenas congue dapibus lorem, in aliquet diam ultricies in.'
    ];

    function generateAuthor() {
        return firstnames[Math.floor(Math.random() * firstnames.length)] +
            ' ' + lastnames[Math.floor(Math.random() * lastnames.length)];
    }

    function generateContent() {
        var para = Math.floor(Math.random() * 4) + 1,
            content = [];
        for (var i = 0; i < para; i++) {
            content.push(paragraphs[Math.floor(Math.random() * paragraphs.length)]);
        }
        return '<p>' + content.join('</p><p>') + '</p>';
    }

    function generateThumb() {
        var gender = Math.round(Math.random());
        var pictureNumber = Math.floor((Math.random() * 50) + 1);
        return 'http://randomuser.me/api/portraits/thumb/' +
            (gender ? 'men' : 'women') + '/' +pictureNumber + '.jpg';

    }

    function generateSubject() {
        return subjects[Math.floor(Math.random() * subjects.length)];
    }

    function generateDiscussion() {
        var topic = generatePost();
        topic.content = generatePosts(topic.subject);
        topic.intro = topic.post.substr(0, 100) + '...</p>';
        topic.replies = topic.content.length;
        return topic;
    }

    function generatePost(subject) {
        return {
            author: generateAuthor(),
            thumb: generateThumb(),
            subject: subject ? 'Re: ' + subject : generateSubject(),
            post: generateContent(),
        };
    }

    function generatePosts(subject) {
        var para = Math.floor(Math.random() * 25) + 1;
        posts = [];
        for (var i = 0; i < para; i++) {
            posts.push(generatePost(subject));
        }
        return posts;
    }

    self.getDiscussions = function(courseid) {
        // console.log('adasd');
        courseid = 0; // Hardcoded for now...
        // console.log(store[courseid], 'te');
        if (!store[courseid]) {
            store[courseid] = [];
            var count = Math.random() * 80 + 20;
            for (var i = 0; i < count; i++) {
                store[courseid].push(generateDiscussion());
            }
        }
        return store[courseid];
    };

    self.getDiscussion = function(discid) {
        return self.getDiscussions(0)[discid];
    };

    return self;
})

.controller('mmForumDiscussionsCtrl', function($scope, $state, discussions) {
    $scope.isTablet = document.body.clientWidth > 600;
    $scope.getURL = function(index) {
        if ($scope.isTablet) {
            return $state.href('site.forum.tablet', {id: index});
        } else {
            return $state.href('site.forum-discussion', {id: index});
        }
    };

    $scope.post = function(t, crop) {
        return t;
    };
    $scope.discussions = discussions;
})

.controller('mmForumDiscussionPostsCtrl', function($scope, $state, discussion) {
    $scope.discussion = discussion;
    $scope.post = function(t) {
        return t.post;
    };
})
;
