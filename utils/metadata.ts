import { createClient } from "@supabase/supabase-js";
import { count } from "console";

const supabase = createClient(
  "https://kpwbglpxjuhiqtgtvenz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtwd2JnbHB4anVoaXF0Z3R2ZW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgzNzg2MjEsImV4cCI6MTk3Mzk1NDYyMX0.zecokpSRK0MI_nOaSAgFZJCMkPSpEXraPKqQD5fogE4"
);

interface IProfile {
  bio:          string;
  address:      string;
  numFollowers: number;
}

export const fetchProfile = async (username:string): Promise<IProfile> => {
  const { data, error } = await supabase
    .from('account_view')
    .select('bio, address, num_followers')
    .match({username: username});

  if (error) {
    throw error;
  }

  console.log(data)

  return {
    bio           :data![0].bio!,
    address       :data![0].address!,
    numFollowers  :data![0].num_followers!,
  };
}

interface ICast {
  text:       string;
  merkleRoot: string;
}

export const fetchTopCast = async (username:string): Promise<ICast> => {
  const { data, error } = await supabase
    .from('account_view')
    .select('activity_view (text, merkle_root)')
    .order('reactions_count', { foreignTable: 'activity_view', ascending: false })
    .limit(1,  {foreignTable: 'activity_view'})
    .match({username: username})

  if (error) {
    throw error;
  }
  return {
    text: data[0].activity_view[0].text,
    merkleRoot: data[0].activity_view[0].merkleRoot,
  }
}
