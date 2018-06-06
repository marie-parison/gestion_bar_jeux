import db from './../app_server/src/models';
import {IGames} from "./gamesInterface";

import {
    removeDiacritics,
    getAuthors,
    getGamesAuthors,
    getEditors,
    getGamesEditors,
    getMecanisms,
    getGamesMecanisms,
    getContents,
    getGamesCategories,
    getCategories,
    getGamesLanguages,
    getLanguages,
    getPictures,
    getGamesDetails,
    getBrandsList,
    getGamesData
} from './func';

const DUMP_CATEGORIES = true;
const DUMP_AUTHORS = false;
const DUMP_EDITORS = false;
const DUMP_MECANISMS = false;
const DUMP_CONTENTS = false;
const DUMP_LANGUAGES = false;
const DUMP_BRANDS = false;
const DUMP_GAMES = false;
const DUMP_PICTURES = false;
const DUMP_GAMES_LANGUAGES = false;
const DUMP_GAMES_CATEGORIES = false;
const DUMP_GAMES_EDITORS = false;
const DUMP_GAMES_AUTHORS = false;
const DUMP_GAMES_MECANISMS = false;

db.sequelize.sync()
    .then(() => {
        console.log('Connection successfull');
        fill();
    })
    .catch((err: any) => {
        console.error('Unable to connect to the database', err)
    });

const games: IGames[] = getGamesData();
function fill() {
    if(DUMP_CATEGORIES) {
        console.log("CATEGORIES");
        let categories = getCategories(games);
        categories.forEach(async category => {
            if(category) {
                try {
                    await db.Categories.findOrCreate({where: {name: category}});
                } catch (e) {
                    console.error(e);
                }
            }
        });

    }

    if(DUMP_LANGUAGES) {
        console.log("LANGUAGES");
        let languages = getLanguages(games);
        languages.forEach(async language => {
            if(language) {
                try {
                    await db.Languages.findOrCreate({where: {name: language}});
                } catch (e) {
                    console.error(e);
                }
            }
        });
    }

    if(DUMP_BRANDS) {
        console.log("BRANDS");
        let brands = getBrandsList(games);
        brands.forEach(async brand => {
            if(brand) {
                try {
                    await db.Brands.findOrCreate({where: {name: brand}});
                } catch (e) {
                    console.error(e);
                }
            }
        });
    }

    if(DUMP_GAMES) {
        console.log("GAMES");
        let games_details = getGamesDetails(games);
        games_details.slice(5400).forEach(async game => {
            if(game) {
                try {
                    let brand = await db.Brands.findOne({where: {name: game.brand}});
                    game.id_brand = brand ? brand.id : null;
                    delete game.brand;
                    await db.Games.findOrCreate({where: game});
                } catch (e) {
                    console.log(e);
                }
            }
        });
    }



    if(DUMP_PICTURES) {
        console.log("PICTURES");
        let pics = getPictures(games);
        console.log("LENGTH: ", pics.length);

        pics.forEach(async picList => {
            if (games) {
                try {
                    let game = await db.Games.findOne({where: {name: picList.game_name}});
                    let game_id = game ? game.id : null;
                    if(game_id) {
                        picList.pics.forEach(async (pic: any) => {
                            pic.id_game = game_id;
                            await db.GamePictures.findOrCreate({where: pic});
                        });
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        });
    }

    if(DUMP_GAMES_LANGUAGES) {
        console.log("GAMES LANGUAGES");
        let games_languages = getGamesLanguages(games);
        console.log("LENGTH:", games_languages.length);
        games_languages.slice(9100).forEach(async games_languages => {
            if (games_languages) {
                try {
                    let game = await db.Games.findOne({where: {name: games_languages.game_name}});
                    let game_id = game ? game.id : null;

                    if(game_id && games_languages.languages) {
                        games_languages.languages.forEach(async (language: any) => {
                            let lang = await db.Languages.findOne({where: {name: language}});
                            let lang_id = lang ? lang.id : null;
                            if(lang_id) {
                                await db.GamesLanguages.findOrCreate({where: {id_game: game_id, id_language: lang_id}});
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
        console.log("GAMES CATEGORIES");
        let games_categories = getGamesCategories(games);
        console.log("LENGTH:", games_categories.length);

        games_categories.slice(4500).forEach(async games_categories_ => {
            if (games_categories_) {
                try {
                    let game = await db.Games.findOne({where: {name: games_categories_.game_name}});
                    let game_id = game ? game.id : null;

                    if(game_id && games_categories_.categories) {
                        games_categories_.categories.forEach(async (category: any) => {
                            let cat = await db.Categories.findOne({where: {name: category}});
                            let cat_id = cat ? cat.id : null;
                            if(cat_id) {
                                await db.GamesCategories.findOrCreate({where: {id_game: game_id, id_category: cat_id}});
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
        console.log("AUTHORS");
        let authors = getAuthors(games);
        authors.forEach(async (author: any) => {
            if(author) {
                try {
                    author = removeDiacritics(author);
                    await db.Authors.findOrCreate({where: {name: author}});
                } catch (e) {
                    console.error(e);
                }
            }
        });
    }

    if(DUMP_GAMES_AUTHORS) {
        console.log("GAMES AUTHORS");
        let games_authors = getGamesAuthors(games);
        console.log("LENGTH:", games_authors.length);

        games_authors.forEach(async games_authors_ => {
            if (games_authors_) {

                try {
                    let game = await db.Games.findOne({where: {name: games_authors_.game_name}});
                    let game_id = game ? game.id : null;

                    if(game_id && games_authors_.authors) {
                        games_authors_.authors.forEach(async (author: any) => {
                            author = removeDiacritics(author);
                            let aut = await db.Authors.findOne({where: {name: author}});
                            let aut_id = aut ? aut.id : null;
                            if(aut_id) {
                                await db.GamesAuthors.findOrCreate({where: {id_game: game_id, id_author: aut_id}});
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
        console.log("EDITORS");
        let editors = getEditors(games);
        editors.forEach(async (editor: any) => {
            if(editor) {
                try {
                    editor = removeDiacritics(editor);
                    await db.Editors.findOrCreate({where: {name: editor}});
                } catch (e) {
                    console.error(e);
                }
            }
        });
    }

    if(DUMP_GAMES_EDITORS) {
        console.log("GAMES EDITORS");
        let games_editors = getGamesEditors(games);
        console.log("LENGTH:", games_editors.length);

        games_editors.forEach(async games_editors_ => {
            if (games_editors_) {

                try {
                    let game = await db.Games.findOne({where: {name: games_editors_.game_name}});
                    let game_id = game ? game.id : null;

                    if(game_id && games_editors_.editors) {
                        games_editors_.editors.forEach(async (editor: any) => {
                            editor = removeDiacritics(editor);
                            let ed = await db.Editors.findOne({where: {name: editor}});
                            let ed_id = ed ? ed.id : null;
                            if(ed_id) {
                                await db.GamesEditors.findOrCreate({where: {id_game: game_id, id_editor: ed_id}});
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
        mecanisms.forEach(async (mecanism: any) => {
            if(mecanism) {
                try {
                    mecanism = removeDiacritics(mecanism);
                    await db.Mecanisms.findOrCreate({where: {name: mecanism}});
                } catch (e) {
                    console.error(e);
                }
            }
        });
    }

    if(DUMP_GAMES_MECANISMS) {
        console.log("MECANISMS");
        let games_mecanisms = getGamesMecanisms(games);
        console.log("LENGTH:", games_mecanisms.length);

        games_mecanisms.forEach(async (games_mecanisms_: any) => {
            if (games_mecanisms_) {

                try {
                    let game = await db.Games.findOne({where: {name: games_mecanisms_.game_name}});
                    let game_id = game ? game.id : null;

                    if(game_id && games_mecanisms_.mecanisms) {
                        games_mecanisms_.mecanisms.forEach(async (mecanism: any) => {
                            mecanism = removeDiacritics(mecanism);
                            let ed = await db.Mecanisms.findOne({where: {name: mecanism}});
                            let ed_id = ed ? ed.id : null;
                            if(ed_id) {

                                await db.GamesMecanisms.findOrCreate({where: {id_game: game_id, id_mecanism: ed_id}});
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
        console.log("CONTENTS");

        let contents = getContents(games);
        contents.forEach(async (contents_: any) => {
            if(contents_) {
                try {
                    let game = await db.Games.findOne({where: {name: contents_.game_name}});
                    let game_id = game ? game.id : null;
                    contents_.contents.forEach(async (content: any) => {
                        content = removeDiacritics(content);
                        await db.Contents.findOrCreate({where: {id_game: game_id, content: content}});
                    });
                } catch (e) {
                    console.error(e);
                }
            }
        });
    }

}
