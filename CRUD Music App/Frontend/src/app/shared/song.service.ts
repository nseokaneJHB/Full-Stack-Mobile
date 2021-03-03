import { Injectable } from '@angular/core';
import { Song } from './song';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class SongService {

	url: string = 'http://localhost:3000/api'

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	};

  	constructor(private http: HttpClient) {}

	addSong(song: Song): Observable<any> {
		return this.http.post<Song>(`${this.url}/create-song`, song, this.httpOptions).pipe(catchError(this.handleError<Song>('Add Song')));
	}

	getSong(id): Observable<Song[]> {
		return this.http.get<Song[]>(`${this.url}/get-song/` + id).pipe(tap((_) => console.log(`Song fetched: ${id}`)), catchError(this.handleError<Song[]>(`Get Song id=${id}`)));
	}

	getSongList(): Observable<Song[]> {
		return this.http.get<Song[]>(`${this.url}`).pipe(tap((songs) => console.log('Songs fetched!')), catchError(this.handleError<Song[]>('Get Songs', [])));
	}

	updateSong(id, song: Song): Observable<any> {
		return this.http.put(`${this.url}/update-song/` + id, song, this.httpOptions).pipe(tap((_) => console.log(`Song updated: ${id}`)), catchError(this.handleError<Song[]>('Update Song')));
	}

	deleteSong(id): Observable<Song[]> {
		return this.http.delete<Song[]>(`${this.url}/delete-song/` + id, this.httpOptions).pipe(tap((_) => console.log(`Song deleted: ${id}`)), catchError(this.handleError<Song[]>('Delete Song')));
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
		console.error(error);
		console.log(`${operation} failed: ${error.message}`);
		return of(result as T);
		};
	}
}
