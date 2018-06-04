const Sequelize = require('sequelize');
const fs = require('fs');

const {removeDiacritics} = require('./func');

const DUMP_CATEGORIES = false;
const DUMP_AUTHORS = false;
const DUMP_EDITORS = false;
const DUMP_MECANISMS = false;
const DUMP_CONTENTS = true;
const DUMP_LANGUAGES = false;
const DUMP_BRANDS = false;
const DUMP_GAMES = false;
const DUMP_PICTURES = false;
const DUMP_GAMES_LANGUAGES = false;
const DUMP_GAMES_CATEGORIES = false;
const DUMP_GAMES_EDITORS = false;
const DUMP_GAMES_AUTHORS = false;
const DUMP_GAMES_MECANISMS = false;


const sequelize = new Sequelize('gestion_bar', 'root', 'mathilde', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false,
    },
    pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 1000000 // very high because I got a lot a timeout error...
    }
});

const Authors = sequelize.define('authors',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING
        },
    },
);

const Editors = sequelize.define('editors',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING
        },
    },
);

const Languages = sequelize.define('languages',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING
        },
    },
);

const Brands = sequelize.define('brands',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING
        },

    },
);
const Mecanisms = sequelize.define('mecanisms',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING
        },

    },
);

const Contents = sequelize.define('game_contents',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        id_game: {
            type: Sequelize.BIGINT,
            references: 'games',
            referencesKey: 'id',
        },
        content: {
            type: Sequelize.STRING
        },
    },
);

const Categories = sequelize.define('categories',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
    },
);

const GamesPictures = sequelize.define('game_pictures',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        id_game: {
            type: Sequelize.BIGINT,
            references: 'games',
            referencesKey: 'id',
        },
        small: {
            type: Sequelize.STRING
        },
        thickbox: {
            type: Sequelize.STRING
        },
        large: {
            type: Sequelize.STRING
        },

    }
);


const Games = sequelize.define('games',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        id_brand: {
            type: Sequelize.BIGINT,
            references: 'brands',
            referencesKey: 'id',
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
        },
        price: {
            type: Sequelize.INTEGER,
        },
        description_fr: {
            type: Sequelize.TEXT,
        },
        description_en: {
            type: Sequelize.TEXT,
        },
        player_min: {
            type: Sequelize.INTEGER,
        },
        player_max: {
            type: Sequelize.INTEGER,
        },
        age_min: {
            type: Sequelize.INTEGER,
        },
        age_max: {
            type: Sequelize.INTEGER,
        },
        duration_min: {
            type: Sequelize.INTEGER,
        },
        duration_max: {
            type: Sequelize.INTEGER,
        },
    },
);

const GamesLanguages = sequelize.define('games_languages', {
    id_game: {
        type: Sequelize.BIGINT,
        references: 'games',
        referencesKey: 'id',
    },
    id_language: {
        type: Sequelize.BIGINT,
        references: 'languages',
        referencesKey: 'id',
    },
});

const GamesAuthors = sequelize.define('games_authors', {
    id_game: {
        type: Sequelize.BIGINT,
        references: 'games',
        referencesKey: 'id',
    },
    id_author: {
        type: Sequelize.BIGINT,
        references: 'authors',
        referencesKey: 'id',
    },
});

const GamesEditors = sequelize.define('games_editors', {
    id_game: {
        type: Sequelize.BIGINT,
        references: 'games',
        referencesKey: 'id',
    },
    id_editor: {
        type: Sequelize.BIGINT,
        references: 'editors',
        referencesKey: 'id',
    },
});

const GamesMecanisms = sequelize.define('games_mecanisms', {
    id_game: {
        type: Sequelize.BIGINT,
        references: 'games',
        referencesKey: 'id',
    },
    id_mecanism: {
        type: Sequelize.BIGINT,
        references: 'mecanisms',
        referencesKey: 'id',
    },
});

const GamesCategories = sequelize.define('games_categories', {
    id_game: {
        type: Sequelize.BIGINT,
        references: 'games',
        referencesKey: 'id',
    },
    id_category: {
        type: Sequelize.BIGINT,
        references: 'categories',
        referencesKey: 'id',
    },
});

Languages.belongsToMany(Games, {
    through: {
        model: GamesLanguages,
        unique: true,
    },
    foreignKey: 'id_language',
});

Games.belongsToMany(Languages, {
    through: {
        model: GamesLanguages,
        unique: true,
    },
    foreignKey: 'id_game',
});





Categories.belongsToMany(Games, {
    through: {
        model: GamesCategories,
        unique: true,
    },
    foreignKey: 'id_category',
});

Games.belongsToMany(Categories, {
    through: {
        model: GamesCategories,
        unique: true,
    },
    foreignKey: 'id_game',
});



Authors.belongsToMany(Games, {
    through: {
        model: GamesAuthors,
        unique: true,
    },
    foreignKey: 'id_author',
});

Games.belongsToMany(Authors, {
    through: {
        model: GamesAuthors,
        unique: true,
    },
    foreignKey: 'id_game',
});


Editors.belongsToMany(Games, {
    through: {
        model: GamesEditors,
        unique: true,
    },
    foreignKey: 'id_editor',
});

Games.belongsToMany(Editors, {
    through: {
        model: GamesEditors,
        unique: true,
    },
    foreignKey: 'id_game',
});



Mecanisms.belongsToMany(Games, {
    through: {
        model: GamesMecanisms,
        unique: true,
    },
    foreignKey: 'id_mecanism',
});

Games.belongsToMany(Mecanisms, {
    through: {
        model: GamesMecanisms,
        unique: true,
    },
    foreignKey: 'id_game',
});

async function dbConnect() {
  try {
      await sequelize.authenticate();
      console.log('Connecton has been etablished');
  } catch (e) {
      console.log(e);
  }
}

function getGamesData() {
    let gamesStr = fs.readFileSync('games.json', 'utf-8');
    let games = JSON.parse(gamesStr);
    return games;
}

function getCategories(games) {
    let arr = [];
    games.forEach( ({caracteristic}) => {
        if(caracteristic.theme) {
            caracteristic.theme.forEach(theme => {
                if(theme) {
                    arr.push(theme);
                }
            })
        }
    });
    return new Set(arr);
}

function getAuthors(games) {
    let arr = [];
    games.forEach( ({caracteristic}) => {
        if(caracteristic.authors) {
            caracteristic.authors.forEach(theme => {
                if(theme) {
                    arr.push(removeDiacritics(theme));
                }
            })
        }
    });
    return new Set(arr);
}

function getMecanisms(games) {
    let arr = [];
    games.forEach( ({caracteristic}) => {
        if(caracteristic.mecanisms) {
            caracteristic.mecanisms.forEach(theme => {
                if(theme) {
                    arr.push(removeDiacritics(theme));
                }
            })
        }
    });
    return new Set(arr);
}

function getContents(games) {
    return games.map(game => ({contents: game.contents, game_name: removeDiacritics(game.name)}));
    let arr = [];
    games.forEach( ({contents}) => {
        if(contents) {
            contents.forEach(theme => {
                if(theme) {
                    arr.push(removeDiacritics(theme));
                }
            })
        }
    });
    return new Set(arr);
}

function getEditors(games) {
    let arr = [];
    games.forEach( ({caracteristic}) => {
        if(caracteristic.editor) {
            caracteristic.editor.forEach(theme => {
                if(theme) {
                    arr.push(removeDiacritics(theme));
                }
            })
        }
    });
    return new Set(arr);
}

function getBrandsList(games) {
    return [...new Set(games.map(({brand}) => brand))];
}

function getPictures(games) {
    return games.map(game => {
       return {game_name: game.name, pics: game.pics};
    });
}

function getLanguages(games) {
    let arr = [];
    games.forEach( ({caracteristic}) => {
        if(caracteristic.language) {
            caracteristic.language.forEach(language => {
                if(language) {
                    arr.push(language);
                }
            })
        }
    });
    return new Set(arr);
}

function getGamesLanguages(games) {
    return games.map(game => ({languages: game.caracteristic.language, game_name: removeDiacritics(game.name)}));
}

function getGamesCategories(games) {
    return games.map(game => ({categories: game.caracteristic.theme, game_name: removeDiacritics(game.name)}));
}

function getGamesAuthors(games) {
    return games.map(game => ({authors: game.caracteristic.authors, game_name: removeDiacritics(game.name)}));
}

function getGamesEditors(games) {
    return games.map(game => ({editors: game.caracteristic.editor, game_name: game.name}));
}

function getGamesMecanisms(games) {
    return games.map(game => ({mecanisms: game.caracteristic.mecanisms, game_name: game.name}));
}

function getGamesDetails(games){
    return games.map((game) => {
        let name = removeDiacritics(game.name);
        let price = game.price_tax_exc;
        let description_fr = removeDiacritics(game.descriptions.fr);
        let description_en = removeDiacritics(game.descriptions.en);
        let player_min = game.caracteristic.nb_players ? game.caracteristic.nb_players.min : null;
        let player_max = game.caracteristic.nb_players ? game.caracteristic.nb_players.max : null;

        let age_min = game.caracteristic.age ? game.caracteristic.age.min : null;
        let age_max = game.caracteristic.age ? game.caracteristic.age.max : null;

        let duration_min = game.caracteristic.duration ? game.caracteristic.duration.min : null;
        let duration_max = game.caracteristic.duration ? game.caracteristic.duration.max : null;

        let brand = game.brand;

        return {
            brand,
            name,
            price,
            description_fr,
            description_en,
            player_min,
            player_max,
            age_min,
            age_max,
            duration_min,
            duration_max,
        }
    });
}

dbConnect();
const games = getGamesData();

if(DUMP_CATEGORIES) {
    let categories = getCategories(games);
    categories.forEach(async category => {
        if(category) {
            try {
                await Categories.findOrCreate({where: {name: category}});
            } catch (e) {
                console.error(e);
            }
        }
    });

}

if(DUMP_LANGUAGES) {
    let languages = getLanguages(games);
    languages.forEach(async language => {
        if(language) {
            try {
                await Languages.findOrCreate({where: {name: language}});
            } catch (e) {
                console.error(e);
            }
        }
    });
}

if(DUMP_BRANDS) {
    let brands = getBrandsList(games);
    brands.forEach(async brand => {
        if(brand) {
            try {
                await Brands.findOrCreate({where: {name: brand}});
            } catch (e) {
                console.error(e);
            }
        }
    });
}

if(DUMP_GAMES) {
    let games_details = getGamesDetails(games);
    games_details.slice(5400).forEach(async game => {
        if(game) {
            try {
                let brand = await Brands.findOne({where: {name: game.brand}});
                game.id_brand = brand ? brand.id : null;
                delete game.brand;
                await Games.findOrCreate({where: game});
            } catch (e) {
                console.log(e);
            }
        }
    });
}



if(DUMP_PICTURES) {
    let pics = getPictures(games);
    console.log("LENGTH: ", pics.length);

    pics.forEach(async picList => {
        if (games) {
            try {
                let game = await Games.findOne({where: {name: picList.game_name}});
                let game_id = game ? game.id : null;
                if(game_id) {
                    picList.pics.forEach(async pic => {
                        pic.id_game = game_id;
                        await GamesPictures.findOrCreate({where: pic});
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    });
}

if(DUMP_GAMES_LANGUAGES) {
    let games_languages = getGamesLanguages(games);
    console.log("LENGTH:", games_languages.length);
    games_languages.slice(9100).forEach(async games_languages => {
        if (games_languages) {
            try {
                let game = await Games.findOne({where: {name: games_languages.game_name}});
                let game_id = game ? game.id : null;

                if(game_id && games_languages.languages) {
                    games_languages.languages.forEach(async language => {
                        let lang = await Languages.findOne({where: {name: language}});
                        let lang_id = lang ? lang.id : null;
                        if(lang_id) {
                            await GamesLanguages.findOrCreate({where: {id_game: game_id, id_language: lang_id}});
                        }
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    });
}


if(DUMP_GAMES_CATEGORIES) {
    let games_categories = getGamesCategories(games);
    console.log("LENGTH:", games_categories.length);

    games_categories.slice(4500).forEach(async games_categories_ => {
        if (games_categories_) {
            try {
                let game = await Games.findOne({where: {name: games_categories_.game_name}});
                let game_id = game ? game.id : null;

                if(game_id && games_categories_.categories) {
                    games_categories_.categories.forEach(async category => {
                        let cat = await Categories.findOne({where: {name: category}});
                        let cat_id = cat ? cat.id : null;
                        if(cat_id) {
                            await GamesCategories.findOrCreate({where: {id_game: game_id, id_category: cat_id}});
                        }
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    });
}


if(DUMP_AUTHORS) {
    let authors = getAuthors(games);
    authors.forEach(async author => {
        if(author) {
            try {
                author = removeDiacritics(author);
                await Authors.findOrCreate({where: {name: author}});
            } catch (e) {
                console.error(e);
            }
        }
    });
}

if(DUMP_GAMES_AUTHORS) {
    let games_authors = getGamesAuthors(games);
    console.log("LENGTH:", games_authors.length);

    games_authors.forEach(async games_authors_ => {
        if (games_authors_) {

            try {
                let game = await Games.findOne({where: {name: games_authors_.game_name}});
                let game_id = game ? game.id : null;

                if(game_id && games_authors_.authors) {
                    games_authors_.authors.forEach(async author => {
                        author = removeDiacritics(author);
                        let aut = await Authors.findOne({where: {name: author}});
                        let aut_id = aut ? aut.id : null;
                        if(aut_id) {
                            await GamesAuthors.findOrCreate({where: {id_game: game_id, id_author: aut_id}});
                        }
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    });
}

if(DUMP_EDITORS) {
    let editors = getEditors(games);
    editors.forEach(async editor => {
        if(editor) {
            try {
                editor = removeDiacritics(editor);
                await Editors.findOrCreate({where: {name: editor}});
            } catch (e) {
                console.error(e);
            }
        }
    });
}

if(DUMP_GAMES_EDITORS) {
    let games_editors = getGamesEditors(games);
    console.log("LENGTH:", games_editors.length);

    games_editors.forEach(async games_editors_ => {
        if (games_editors_) {

            try {
                let game = await Games.findOne({where: {name: games_editors_.game_name}});
                let game_id = game ? game.id : null;

                if(game_id && games_editors_.editors) {
                    games_editors_.editors.forEach(async editor => {
                        editor = removeDiacritics(editor);
                        let ed = await Editors.findOne({where: {name: editor}});
                        let ed_id = ed ? ed.id : null;
                        if(ed_id) {
                            await GamesEditors.findOrCreate({where: {id_game: game_id, id_editor: ed_id}});
                        }
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    });
}

if(DUMP_MECANISMS) {
    let mecanisms = getMecanisms(games);
    mecanisms.forEach(async mecanism => {
        if(mecanism) {
            try {
                mecanism = removeDiacritics(mecanism);
                await Mecanisms.findOrCreate({where: {name: mecanism}});
            } catch (e) {
                console.error(e);
            }
        }
    });
}

if(DUMP_GAMES_MECANISMS) {
    let games_mecanisms = getGamesMecanisms(games);
    console.log("LENGTH:", games_mecanisms.length);

    games_mecanisms.forEach(async games_mecanisms_ => {
        if (games_mecanisms_) {

            try {
                let game = await Games.findOne({where: {name: games_mecanisms_.game_name}});
                let game_id = game ? game.id : null;

                if(game_id && games_mecanisms_.mecanisms) {
                    games_mecanisms_.mecanisms.forEach(async mecanism => {
                        mecanism = removeDiacritics(mecanism);
                        let ed = await Mecanisms.findOne({where: {name: mecanism}});
                        let ed_id = ed ? ed.id : null;
                        if(ed_id) {

                            await GamesMecanisms.findOrCreate({where: {id_game: game_id, id_mecanism: ed_id}});
                        }
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    });
}

if(DUMP_CONTENTS) {
    let contents = getContents(games);
    contents.forEach(async contents_ => {
        if(contents_) {
            try {
                let game = await Games.findOne({where: {name: contents_.game_name}});
                let game_id = game ? game.id : null;
                contents_.contents.forEach(async content => {
                    content = removeDiacritics(content);
                    await Contents.findOrCreate({where: {id_game: game_id, content: content}});
                });
            } catch (e) {
                console.error(e);
            }
        }
    });
}

// Games.findById(1, { include: Languages}).then((game) => {
    // console.log(game);
    // console.log(game.languages[0].name)
// });

// GamesLanguages.findOrCreate({
//     where: {
//         id_game: 1,
//         id_language: 1,
//     }
// }).then( () => {}).catch(err => console.error(err));

