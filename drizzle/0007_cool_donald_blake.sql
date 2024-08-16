INSERT INTO "event" (
    name,
    description,
    start_date,
    end_date,
    image_url,
    people_limit,
    venue_name,
    venue_address,
    created_by
) VALUES (
    'Gualicho #1',
    'Resistir y creer mediante el baile',
    '2024-05-18 23:00:00.000',
    '2024-05-19 05:00:00.000',
    'https://example.com/summer-fest-image.jpg',
    300,
    'Casa Grande',
    'Belgrano 3298, Santa Fe, Santa Fe, Argentina',
    4
)
RETURNING *;
