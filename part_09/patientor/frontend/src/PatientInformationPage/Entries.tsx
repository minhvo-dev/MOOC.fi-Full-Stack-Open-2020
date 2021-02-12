import React from "react";
import { Entry } from "../types";
import EntryDetails from "./EntryDetails";
import { Grid } from "semantic-ui-react";

const Entries: React.FC<{ entries: Entry[] }> = ({ entries }) => {
  return (
    <div>
      <h2>Entries</h2>
      <Grid>
        {entries.map(entry =>
          <Grid.Column width={5} key={entry.id}>
            <EntryDetails entry={entry} />
          </Grid.Column>
        )}
      </Grid>
    </div>
  );
};

export default Entries;
