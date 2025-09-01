-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.ACCOUNT (
  type USER-DEFINED NOT NULL,
  username text NOT NULL UNIQUE,
  clerk_id text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  email text NOT NULL UNIQUE,
  CONSTRAINT ACCOUNT_pkey PRIMARY KEY (clerk_id)
);
CREATE TABLE public.BUSINESS (
  description text,
  google_maps_location text,
  latitude numeric,
  longitude numeric,
  street_name text,
  street_no text,
  unit_no text,
  postal text,
  name text,
  username text NOT NULL,
  tags ARRAY,
  like_count integer DEFAULT 0,
  CONSTRAINT BUSINESS_pkey PRIMARY KEY (username),
  CONSTRAINT business_username_fkey FOREIGN KEY (username) REFERENCES public.ACCOUNT(username)
);
CREATE TABLE public.EVENT (
  username text NOT NULL,
  google_map text,
  title text,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  uuid uuid NOT NULL DEFAULT gen_random_uuid(),
  start timestamp with time zone,
  end timestamp with time zone,
  address text,
  latitude numeric,
  longitude numeric,
  like_count integer DEFAULT 0,
  CONSTRAINT EVENT_pkey PRIMARY KEY (uuid),
  CONSTRAINT event_username_fkey FOREIGN KEY (username) REFERENCES public.BUSINESS(username)
);
CREATE TABLE public.FOLDERS (
  username text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  folder_name text NOT NULL,
  description text,
  is_public boolean NOT NULL DEFAULT false,
  share_id uuid NOT NULL DEFAULT gen_random_uuid(),
  allow_collaboration boolean NOT NULL DEFAULT false,
  CONSTRAINT FOLDERS_pkey PRIMARY KEY (username, folder_name),
  CONSTRAINT folders_username_fkey FOREIGN KEY (username) REFERENCES public.ACCOUNT(username)
);
CREATE TABLE public.FOLDER_COLLABORATORS (
  folder_name text NOT NULL,
  owner_username text NOT NULL,
  collaborator_username text NOT NULL,
  role text NOT NULL CHECK (role = ANY (ARRAY['viewer'::text, 'editor'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT FOLDER_COLLABORATORS_pkey PRIMARY KEY (folder_name, owner_username, collaborator_username),
  CONSTRAINT FOLDER_COLLABORATORS_owner_username_folder_name_fkey FOREIGN KEY (owner_username) REFERENCES public.FOLDERS(username),
  CONSTRAINT FOLDER_COLLABORATORS_collaborator_username_fkey FOREIGN KEY (collaborator_username) REFERENCES public.ACCOUNT(username),
  CONSTRAINT FOLDER_COLLABORATORS_owner_username_folder_name_fkey FOREIGN KEY (folder_name) REFERENCES public.FOLDERS(username),
  CONSTRAINT FOLDER_COLLABORATORS_owner_username_folder_name_fkey FOREIGN KEY (owner_username) REFERENCES public.FOLDERS(folder_name),
  CONSTRAINT FOLDER_COLLABORATORS_owner_username_folder_name_fkey FOREIGN KEY (folder_name) REFERENCES public.FOLDERS(folder_name)
);
CREATE TABLE public.FOLDER_ITEMS (
  username text NOT NULL,
  folder_name text NOT NULL,
  item_type text NOT NULL CHECK (item_type = ANY (ARRAY['business'::text, 'event'::text])),
  item_id text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT FOLDER_ITEMS_pkey PRIMARY KEY (username, folder_name, item_type, item_id),
  CONSTRAINT FOLDER_ITEMS_username_folder_name_fkey FOREIGN KEY (username) REFERENCES public.FOLDERS(username),
  CONSTRAINT FOLDER_ITEMS_username_folder_name_fkey FOREIGN KEY (folder_name) REFERENCES public.FOLDERS(folder_name),
  CONSTRAINT FOLDER_ITEMS_username_folder_name_fkey FOREIGN KEY (username) REFERENCES public.FOLDERS(folder_name),
  CONSTRAINT FOLDER_ITEMS_username_folder_name_fkey FOREIGN KEY (folder_name) REFERENCES public.FOLDERS(username)
);
CREATE TABLE public.LIKE_BUSINESS (
  username text NOT NULL,
  business_username text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT LIKE_BUSINESS_pkey PRIMARY KEY (username, business_username),
  CONSTRAINT likes_username_fkey FOREIGN KEY (username) REFERENCES public.ACCOUNT(username),
  CONSTRAINT likes_business_username_fkey FOREIGN KEY (business_username) REFERENCES public.BUSINESS(username)
);
CREATE TABLE public.LIKE_EVENT (
  username text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  event uuid NOT NULL,
  CONSTRAINT LIKE_EVENT_pkey PRIMARY KEY (username, event),
  CONSTRAINT like_event_event_fkey FOREIGN KEY (event) REFERENCES public.EVENT(uuid),
  CONSTRAINT like_event_username_fkey FOREIGN KEY (username) REFERENCES public.ACCOUNT(username)
);
CREATE TABLE public.REVIEWS (
  business_username text NOT NULL,
  review text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  username text,
  uuid uuid NOT NULL DEFAULT gen_random_uuid(),
  event_uuid uuid,
  CONSTRAINT REVIEWS_pkey PRIMARY KEY (uuid),
  CONSTRAINT reviews_business_username_fkey FOREIGN KEY (business_username) REFERENCES public.BUSINESS(username),
  CONSTRAINT REVIEWS_event_uuid_fkey FOREIGN KEY (event_uuid) REFERENCES public.EVENT(uuid),
  CONSTRAINT reviews_username_fkey FOREIGN KEY (username) REFERENCES public.ACCOUNT(username)
);
CREATE TABLE public.USER (
  gender text,
  first_name text,
  last_name text,
  dob date,
  username text NOT NULL,
  CONSTRAINT USER_pkey PRIMARY KEY (username),
  CONSTRAINT user_username_fkey FOREIGN KEY (username) REFERENCES public.ACCOUNT(username)
);