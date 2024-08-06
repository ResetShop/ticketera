-- Script to create the register for the first event, Gualicho #1 --

INSERT INTO event (
    name,
    description,
    start_date,
    end_date,
    imageUrl,
    people_limit,
    venue_name,
    venue_address,
    created_by,
) VALUES (
    'Gualicho #1',
    'Resistir y creer mediante el baile',
    '2024-18-05 23:00:00',
    '2024-19-05 05:00:00',
    'https://example.com/summer-fest-image.jpg',
    300,
    'Casa Grande',
    'Belgrano 3298, Santa Fe, Santa Fe, Argentina',
    1
);

-- Set the id_event for all tickets to 1 --
UPDATE ticket
SET id_event = 1;
