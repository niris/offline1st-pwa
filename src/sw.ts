import { precacheAndRoute } from 'workbox-precaching';
import { clientsClaim, skipWaiting } from 'workbox-core';
import { openDB, IDBPDatabase } from "idb";

declare let self: ServiceWorkerGlobalScope;
declare type ExtendableEvent = any;

// Ensure that the service worker takes control of the page as soon as possible
skipWaiting();
clientsClaim();

// Precache and route any static assets defined in the build manifest file(s)
precacheAndRoute(self.__WB_MANIFEST);

// Function to store response in IndexedDB
async function storeResponseInIndexedDB(request: Request, response: Response): Promise<void> {
    // Open a connection to IndexedDB
    const db = await openDB("media-storage", 1, {
          upgrade(db: IDBPDatabase) {
            db.createObjectStore("media");
          },
        });
    // Create an object store (if not already created)
    if (!db.objectStoreNames.contains('media')) {
      db.createObjectStore('media');
    }

    const video = await fetch(
        request.url,
        { headers: request.headers }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch object from network");
    }

    const blob = await video.blob();

    // Store the response in the object store
    const tx = db.transaction('media', 'readwrite');
    tx.objectStore('media').put(blob, request.url);
}

// Function to retrieve response from IndexedDB
async function getResponseFromIndexedDB(request: Request): Promise<Response | null> {
  // Open a connection to IndexedDB
  const db = await openDB("media-storage", 1, {
          upgrade(db: IDBPDatabase) {
            db.createObjectStore("media");
          },
        });
  // Retrieve the response from the object store
  const tx = db.transaction('media', 'readonly');
  const blob = await tx?.objectStore('media').get(request.url);

  if (blob instanceof Blob) {
    // Create a response object with the blob data
    const response = new Response(blob, {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': blob.type,
      },
    });
    return response;
  }
  
  return null;
}


// TODO implement install and activate event listeners

// Intercept fetch requests and respond accordingly
self.addEventListener("fetch", (event: ExtendableEvent) => {
    event.respondWith(
        (async () => {
            const fetchEvent = event as ExtendableEvent;
            // Check if there's a stored response in IndexedDB
            console.log("fetchEvent.request", fetchEvent.request)

            const cachedResponse = fetchEvent.request.method === "GET" ? await getResponseFromIndexedDB(fetchEvent.request) : null;
            
            console.log(`${fetchEvent.request.method} ${fetchEvent.request.url} => ${cachedResponse ? 'cache' : 'online'}`);
            
            if (cachedResponse) {
               console.log ("fetching from cache", cachedResponse);
                // If a stored response is found in IndexedDB, return it
                return cachedResponse;
            } else {
                console.log ("fetching from network");
                const response = await fetch(fetchEvent.request);
                console.log ("storing in cache", response);
                storeResponseInIndexedDB(fetchEvent.request, response.clone());
                
                return response;
            }
        })()
    );
});
