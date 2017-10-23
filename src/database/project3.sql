USE apparel;

--View all items
select * from apparel;

--View specific item by id
set @id = 0075457151018;
select * from apparel where id=@id;

--Add new item
insert into apparel
    (
        `id`,
        `type`,
        `size`,
        `color`,
        `qty`,
        `price`,
        `deliveryDate`
    )
    values
    (
        '1234567890123',
        'shorts',
        'XL',
        'burgundy',
        12,
        100.00,
        '2017-10-23 04:57:40'
    );

--Delete item
delete from apparel
where
    id = '1234567890123';

--Update item
update apparel
set
    qty = 2
where
    id = '0100503089653';

--Search item on sale by id
select * from sale where id='2001546796691';

--Add new item on sale
insert into sale
    (
        `timestamp`,
        `qty`,
        `apparel`
    )
    values
    (
        '2017-10-23',
        10,
        '4563488547499'
    );

--Delete item on sale
delete from sale
where
    id = '1739914210791';

--Update item on sale
update sale
set
    qty = 2
where
    id = '9089617160780';

--Search order request by id
select * from orderRequest where status='pending';

--Add new order
insert into orderRequest
    (
        `id`,
        `timestamp`,
        `status`
    )
    values
    (
        '0516025318729',
        '2017-10-23',
        'pending'
    );

--Delete order
delete from orderRequest
where
    id = '0516025318729';

--Update order
update orderRequest
set
    status = 'cancelled'
where
    id = '0516025318728';

--Search deliveries by status
select * from orderRequest where status='delivered';

--Add new delivery
insert into orderRequest
    (
        `id`,
        `timestamp`,
        `status`
    )
    values
    (
        '0516025318723',
        '2017-10-23',
        'delivered'
    );

--Delete delivery
delete from orderRequest
where
    id = '0516025318723';

--Update delivery
update orderRequest
set
    status = 'delivered'
where
    id = '1846091407286';

--Search audti trail
select * from audit where id='0368143779567';