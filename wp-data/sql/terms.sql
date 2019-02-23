SELECT * FROM wp_term_relationships tr INNER JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
INNER JOIN wp_terms t ON t.term_id = tt.term_id where taxonomy = 'post_tag'