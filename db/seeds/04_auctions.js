
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('auctions').del()
    .then(function () {
      // Inserts seed entries
      let now = new Date();
      let nearFuture = now.setDate(now.getDate() + 2)
      let future = new Date(Date.now() + 100000000000).toISOString();
      return knex('auctions').insert([
        { profile_id: 2, category_id: 17, location_id: 1, end_time: now, title: 'sofa', description: 'Brown Love Seat slight worn', ended: true },
        { profile_id: 3, category_id: 1, location_id: 2, end_time: now, title: 'table', description: 'antiques table oak/maple with marble corners' },
        { profile_id: 2, category_id: 20, location_id: 3, end_time: now, title: 'rain proof tent', description: 'REI 2010 green medium tent' },
        { profile_id: 5, category_id: 15, location_id: 3, end_time: now, title: 'Canon camera', description: 'camera 35MM cannon' },
        { profile_id: 5, category_id: 15, location_id: 1, end_time: future, title: 'Apple MacBook Pro 13-inch', description: 'Gently Used, mid-2015' },
        { profile_id: 5, category_id: 15, location_id: 2, end_time: future, title: 'klean kanteen insulated', description: '27oz green' },
        { profile_id: 2, category_id: 22, location_id: 1, end_time: future, title: 'Baseball bat', description: 'Tan, oak, 15lbs' },
        { profile_id: 2, category_id: 22, location_id: 1, end_time: now, title: 'Soccer ball', description: 'Nike size 5' }, 
        { profile_id: 2, category_id: 17, location_id: 1, end_time: future, title: 'Chair', description: 'Padded seat and upholstered with quality and nice thick fabric.This chair is comfortable and can be used as a desk or dining chair.' }, 
        { profile_id: 3, category_id: 22, location_id: 2, end_time: future, title: 'Lego incomplete, boxes',
    description: 'All of the Lego sets are incomplete, it can use for future reference. If you can put your mind into it, you can create anything even it incompletes Legos.'},
     { profile_id: 4,
    category_id: 18,
    location_id: 3,
    end_time: future,
    title: 'Wood Folding Banquet Table',
    description: 'These wood folding banquet tables. They were used in stores for displaying merchandise and are in used but fully functional condition - perfect for events when covered with a tablecloth.Fully functional.'
}, {
    profile_id: 5,
    category_id: 13,
    location_id: 4,
    end_time: future,
    title: 'CURRY 2 (GS)',
    description: '100% AUTHENTICDEAD STOCK/NEWCOMES WITH RECEIPT UPON REQUESTADD TO YOUR SHOE COLLECTION: This "Providence Road" edition for the Curry 2 pays tribute to where Steph Curry grew up. While he was born in Akron, Ohio, he was raised in Charlotte, N.C.'
}, {
    profile_id: 5,
    category_id: 2,
    location_id: 4,
    end_time: future,
    title: 'Crock Pot', 
    description: 'Nice Crockpot, works well, no issues, barely used.Its pretty large, I think 7 L.'
}, {
    profile_id: 4,
    category_id: 2,
    location_id: 2,
    end_time: future,
    title: 'Microwave',
    description: 'Sharp Carousel Microwave - in perfect working condition'
}, {
    profile_id: 3,
    category_id: 2,
    location_id: 1,
    end_time: future,
    title: 'Sandwich-Waffle-Maker Stainless Steel 3 in 1 Griddle Grill', 
    description: 'makes excellent waffles and grilled cheese sandwiches(the waffle irons turn around to make a smooth grill '
}, {
    profile_id: 2,
    category_id: 3,
    location_id: 2,
    end_time: future,
    title: 'Calder Print',
    description: 'Rare Alexander Calder Print Artist: Alexander Calder, American (1898 - 1976)Title: Derriere Le Miroir (Study for Sculpture III)Year: 1975Medium: Lithograph from bookSize: 15 in. x 22 in. (38.1 cm x 55.88 cm)'
}, {
    profile_id: 4,
    category_id: 2,
    location_id: 1,
    end_time: future,
    title: 'CLASSIC SINGER SEWING/EMBROIDERING MACHINE', 
    description: 'Built like a watch in the largest sewing factory in the world!Smooth, quite and strong!A huge variety of fabrics from linen to lace, horse blankets to buckram.'
}, {
    profile_id: 3,
    category_id: 8,
    location_id: 3,
    end_time: future,
    title: 'Two bikes - moving and cant take them',
    description: 'moving and cant take my bikes, so hoping you can take them off of me.'
}, {
    profile_id: 5,
    category_id: 8,
    location_id: 4,
    end_time: future,
    title: 'Hebb Electric bicycle',
    description: 'Everything mechanical works properly on this bike. Comes with a new charger. The range is about 25 miles. It has a nexus 7 speed internal hub in the back '
}, {
    profile_id: 3,
    category_id: 10,
    location_id: 1,
    end_time: future,
    title: 'Lonely Planet books', description: 'Practically FREE!!'},
    {profile_id: 5, category_id: 10, location_id: 2, end_time: now, title: 'Kaplan MCAT Suite of Books',
    description: 'EDUCATION!'
}
      ]);
    });
};
