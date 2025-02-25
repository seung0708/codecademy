import React from 'react';
import {http, HttpResponse} from 'msw';
import {setUpServer} from 'msw/node';

import {render, fireEvent, screen} from '@testing-library/react';

import '@testing-library/jest-dom';
import 'fet'