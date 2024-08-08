BEGIN;
UPDATE ticket
SET id_event = (SELECT id FROM event ORDER BY id DESC LIMIT 1);
-- Check the results
-- If everything looks good:
COMMIT;
-- If there's a problem:
-- ROLLBACK;
