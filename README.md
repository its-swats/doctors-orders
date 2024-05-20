## Doctor's Orders
[Publicly available on Vercel](https://doctors-orders-shawn-watsons-projects.vercel.app/)

## Implementation Details
This is a note-taking app allowing a user to take notes on a patient, and search those notes. It is built using NextJS 14 and Tailwind.

On root page load, users can see all of their patients on the left, and all of their notes on the right

Clicking on a User on the left will load in to that user's note history, allowing for new notes to be created, or existing notes to be editited/deleted. Clicking on a selected user will take you back to the All Notes view.

The search bar at the top will search in the current scope -- when on the root, it will search for that text in any note. When on a Patient's page, it will search only for notes on that user.

All components are Server Components, unless user input is specifically needed - forms, state, etc.

Fetchs are done using the caching capabilities of NextJS and its App Router, caching results until the page needs to be revalidated due to edits/creates/deletes.

## Next Steps
In order of importance, I would add next:
1) Implement an Add Note button to the "All Notes" view, and update form to have a dropdown for Patients
2) Organize the Notes by most recently Updated At
3) Organize the Patient List by most recently updated Note
4) Make the two column scroll independently

## Known issues
1) The Search Box does not always clear when switching between patients
2) When viewing in Mobile proportions, patients that don't have an exisitng note are not accessible.

## Run locally

To run locally, first, run the development server:

```bash
npm run dev
```

Then, create a postgres server and add the following to the `.env`

```
POSTGRES_URL=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
```

After that, seed the database
```bash
npm run seed
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


