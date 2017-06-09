
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('images').del()
    .then(function () {
      // Inserts seed entries
      return knex('images').insert([
        { auction_id: 1, url: 'http://res-4.cloudinary.com/dreams-co-uk/image/upload/c_pad,dpr_1.0,f_auto,q_80/kelso_sofa_bed_as_a_sofa_2.jpg' },
        { auction_id: 2, url: 'http://www.ikea.com/PIAimages/0106117_PE253936_S5.JPG' },
        { auction_id: 3, url: 'https://www.rei.com/media/a1c8e1cc-c4c6-4468-8472-b261ff6e7b7c' },
        { auction_id: 4, url: 'http://68.media.tumblr.com/905ed2246fcb4db31725dec44bdd4562/tumblr_inline_nqhuljHpnz1qarqqa_1280.jpg' },
        { auction_id: 5, url: 'https://www.laptopmag.com/images/uploads/4989/g/apple-macbook-pro-13-2016-nw-g02.jpg' },
        { auction_id: 6, url: 'https://target.scene7.com/is/image/Target/50875135?wid=520&hei=520&fmt=pjpeg' },
        { auction_id: 7, url: 'http://leanblitzconsulting.com/wp-content/uploads/2011/12/baseball-bat.jpg' },
        { auction_id: 8, url: 'http://grfx.cstv.com/photos/schools/geo/sports/w-soccer/auto_vipgiant_w/12151309.jpeg' }
      ]);
    });
};
